# Database Design Rules

## Overview
Essential rules for designing robust, scalable, and maintainable database schemas.

## Rules

### DD1: Follow Database Normalization Principles
- **Rule**: Follow database normalization principles
- **Category**: Database Design
- **Description**: Database schemas must follow normalization principles (1NF, 2NF, 3NF) to eliminate data redundancy and maintain data integrity. Balance normalization with performance requirements.
- **Examples**:
  ```python
  from sqlalchemy import Column, Integer, String, ForeignKey, Table
  from sqlalchemy.ext.declarative import declarative_base
  from sqlalchemy.orm import relationship
  
  Base = declarative_base()
  
  # ❌ Bad - Denormalized design with data redundancy
  class OrderDenormalized(Base):
      __tablename__ = 'orders_bad'
      
      id = Column(Integer, primary_key=True)
      customer_name = Column(String(100))  # Repeated data
      customer_email = Column(String(100))  # Repeated data
      customer_address = Column(String(200))  # Repeated data
      product_name = Column(String(100))  # Repeated data
      product_price = Column(Integer)  # Repeated data
      quantity = Column(Integer)
      total = Column(Integer)
  
  # ✅ Good - Normalized design (3NF)
  class Customer(Base):
      __tablename__ = 'customers'
      
      id = Column(Integer, primary_key=True)
      name = Column(String(100), nullable=False)
      email = Column(String(100), unique=True, nullable=False)
      address = Column(String(200))
      
      orders = relationship("Order", back_populates="customer")
  
  class Product(Base):
      __tablename__ = 'products'
      
      id = Column(Integer, primary_key=True)
      name = Column(String(100), nullable=False)
      price = Column(Integer, nullable=False)  # Price in cents
      description = Column(String(500))
      
      order_items = relationship("OrderItem", back_populates="product")
  
  class Order(Base):
      __tablename__ = 'orders'
      
      id = Column(Integer, primary_key=True)
      customer_id = Column(Integer, ForeignKey('customers.id'), nullable=False)
      order_date = Column(DateTime, default=datetime.utcnow)
      status = Column(String(20), default='pending')
      
      customer = relationship("Customer", back_populates="orders")
      order_items = relationship("OrderItem", back_populates="order")
  
  class OrderItem(Base):
      __tablename__ = 'order_items'
      
      id = Column(Integer, primary_key=True)
      order_id = Column(Integer, ForeignKey('orders.id'), nullable=False)
      product_id = Column(Integer, ForeignKey('products.id'), nullable=False)
      quantity = Column(Integer, nullable=False)
      unit_price = Column(Integer, nullable=False)  # Price at time of order
      
      order = relationship("Order", back_populates="order_items")
      product = relationship("Product", back_populates="order_items")
  ```

### DD2: Design Proper Database Indexes
- **Rule**: Design proper database indexes
- **Category**: Database Design
- **Description**: Create appropriate indexes for frequently queried columns, foreign keys, and composite queries. Monitor and optimize index usage to balance query performance with write performance.
- **Examples**:
  ```python
  from sqlalchemy import Index, UniqueConstraint
  
  class User(Base):
      __tablename__ = 'users'
      
      id = Column(Integer, primary_key=True)
      email = Column(String(100), nullable=False)
      username = Column(String(50), nullable=False)
      first_name = Column(String(50))
      last_name = Column(String(50))
      created_at = Column(DateTime, default=datetime.utcnow)
      is_active = Column(Boolean, default=True)
      
      # Unique constraints
      __table_args__ = (
          UniqueConstraint('email', name='uq_user_email'),
          UniqueConstraint('username', name='uq_user_username'),
          
          # Single column indexes
          Index('ix_user_email', 'email'),
          Index('ix_user_created_at', 'created_at'),
          Index('ix_user_active', 'is_active'),
          
          # Composite indexes for common query patterns
          Index('ix_user_active_created', 'is_active', 'created_at'),
          Index('ix_user_name_search', 'first_name', 'last_name'),
      )
  
  # Query examples that benefit from these indexes
  def get_active_users_by_date_range(start_date, end_date):
      # Uses ix_user_active_created composite index
      return session.query(User).filter(
          User.is_active == True,
          User.created_at.between(start_date, end_date)
      ).all()
  
  def search_users_by_name(first_name, last_name):
      # Uses ix_user_name_search composite index
      return session.query(User).filter(
          User.first_name == first_name,
          User.last_name == last_name
      ).all()
  
  # Index monitoring query (PostgreSQL)
  def analyze_index_usage():
      query = """
      SELECT 
          schemaname,
          tablename,
          indexname,
          idx_tup_read,
          idx_tup_fetch,
          idx_scan
      FROM pg_stat_user_indexes
      WHERE idx_scan = 0  -- Unused indexes
      ORDER BY schemaname, tablename;
      """
      return session.execute(query).fetchall()
  ```

### DD3: Implement Proper Data Validation and Constraints
- **Rule**: Implement proper data validation and constraints
- **Category**: Database Design
- **Description**: Use database constraints (NOT NULL, UNIQUE, CHECK, FOREIGN KEY) to ensure data integrity at the database level. Implement both database and application-level validation.
- **Examples**:
  ```python
  from sqlalchemy import CheckConstraint
  from sqlalchemy.dialects.postgresql import ENUM
  import re
  
  # Define custom types and constraints
  user_status_enum = ENUM('active', 'inactive', 'suspended', name='user_status')
  
  class User(Base):
      __tablename__ = 'users'
      
      id = Column(Integer, primary_key=True)
      email = Column(String(100), nullable=False, unique=True)
      username = Column(String(50), nullable=False, unique=True)
      age = Column(Integer)
      salary = Column(Integer)  # In cents
      status = Column(user_status_enum, nullable=False, default='active')
      created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
      
      # Database constraints
      __table_args__ = (
          CheckConstraint('age >= 13 AND age <= 120', name='ck_user_valid_age'),
          CheckConstraint('salary >= 0', name='ck_user_positive_salary'),
          CheckConstraint("email ~ '^[^@]+@[^@]+\.[^@]+$'", name='ck_user_valid_email'),
          CheckConstraint("length(username) >= 3", name='ck_user_min_username_length'),
      )
  
  # Application-level validation with SQLAlchemy events
  from sqlalchemy import event
  from sqlalchemy.orm import validates
  
  class UserValidator:
      @validates('email')
      def validate_email(self, key, address):
          if not re.match(r'^[^@]+@[^@]+\.[^@]+$', address):
              raise ValueError('Invalid email format')
          return address
      
      @validates('username')
      def validate_username(self, key, username):
          if len(username) < 3:
              raise ValueError('Username must be at least 3 characters')
          if not re.match(r'^[a-zA-Z0-9_]+$', username):
              raise ValueError('Username can only contain letters, numbers, and underscores')
          return username
      
      @validates('age')
      def validate_age(self, key, age):
          if age is not None and (age < 13 or age > 120):
              raise ValueError('Age must be between 13 and 120')
          return age
  
  # Order table with business constraints
  class Order(Base):
      __tablename__ = 'orders'
      
      id = Column(Integer, primary_key=True)
      customer_id = Column(Integer, ForeignKey('customers.id'), nullable=False)
      total_amount = Column(Integer, nullable=False)  # In cents
      discount_amount = Column(Integer, default=0)
      status = Column(String(20), nullable=False, default='pending')
      order_date = Column(DateTime, nullable=False, default=datetime.utcnow)
      
      __table_args__ = (
          CheckConstraint('total_amount > 0', name='ck_order_positive_total'),
          CheckConstraint('discount_amount >= 0', name='ck_order_positive_discount'),
          CheckConstraint('discount_amount <= total_amount', name='ck_order_valid_discount'),
          CheckConstraint("status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')", 
                         name='ck_order_valid_status'),
      )
  ```

### DD4: Design for Data Security and Privacy
- **Rule**: Design for data security and privacy
- **Category**: Database Design
- **Description**: Implement appropriate security measures including encryption for sensitive data, access controls, and audit trails. Follow privacy regulations (GDPR, CCPA) requirements.


### DD5: Implement Database Migration Strategies
- **Rule**: Implement database migration strategies
- **Category**: Database Design
- **Description**: Use versioned database migrations to manage schema changes safely. Implement backward-compatible changes when possible and plan for rollback scenarios.

### DD6: Design for Performance and Scalability
- **Rule**: Design for performance and scalability
- **Category**: Database Design
- **Description**: Design database schemas that can handle growth in data volume and user load. Consider partitioning, sharding, and query optimization strategies from the beginning.
