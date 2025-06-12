# Code Quality Rules

## Overview
Essential rules for maintaining high code quality during development.

## Rules

### CQ1: Write Clean, Readable Code
- **Rule**: Write clean, readable code
- **Category**: Code Quality
- **Description**: All code must be written with clarity and readability as primary concerns. Use meaningful variable names, avoid complex nested structures, and write self-documenting code.
- **Examples**:
  ```python
  # ❌ Bad - unclear variable names and complex logic
  def calc(x, y, z):
      return y * 2.5 if x > 50 else y * 1.8 if z else y
  
  # ✅ Good - clear names and readable logic
  def calculate_price(quantity, base_price, has_premium_discount):
      BULK_MULTIPLIER = 2.5
      PREMIUM_MULTIPLIER = 1.8
      
      if quantity > 50:
          return base_price * BULK_MULTIPLIER
      
      return base_price * PREMIUM_MULTIPLIER if has_premium_discount else base_price
  ```

### CQ2: Follow Established Coding Standards
- **Rule**: Follow established coding standards
- **Category**: Code Quality
- **Description**: Code must adhere to team-established coding standards and conventions. Use consistent formatting, naming conventions, and project structure across the entire codebase.
- **Examples**:
  ```python
  # ❌ Bad - inconsistent naming and formatting
  class userservice:
      def GetUserData(self,user_id):
          return self.db.find(user_id)
  
  # ✅ Good - follows PEP 8 conventions
  class UserService:
      def get_user_data(self, user_id: int) -> dict:
          """Retrieve user data by ID."""
          return self.db.find(user_id)
  
  # Use tools like black, isort, and flake8
  # pyproject.toml configuration
  [tool.black]
  line-length = 88
  target-version = ['py38']
  include = '\.pyi?$'
  
  [tool.isort]
  profile = "black"
  multi_line_output = 3
  line_length = 88
  ```

### CQ3: Implement Proper Error Handling
- **Rule**: Implement proper error handling
- **Category**: Code Quality
- **Description**: All potential error conditions must be properly handled with appropriate error handling mechanisms. Provide meaningful error messages and handle edge cases gracefully.
- **Examples**:
  ```python
  import json
  import logging
  
  # ❌ Bad - no error handling
  def parse_user_data(json_string):
      data = json.loads(json_string)
      return data['user']
  
  # ✅ Good - comprehensive error handling
  def parse_user_data(json_string: str) -> dict:
      """Parse user data from JSON string with proper error handling."""
      try:
          if not json_string or not isinstance(json_string, str):
              raise ValueError('Invalid input: Expected non-empty string')
          
          data = json.loads(json_string)
          
          if 'user' not in data:
              raise ValueError('User data not found in JSON')
          
          return data['user']
          
      except json.JSONDecodeError as e:
          logging.error(f'JSON parsing failed: {e}')
          raise ValueError(f'Invalid JSON format: {e}')
      except Exception as e:
          logging.error(f'Unexpected error parsing user data: {e}')
          raise ValueError(f'User data parsing failed: {e}')
  ```

### CQ4: Add Comprehensive Comments and Documentation
- **Rule**: Add comprehensive comments and documentation
- **Category**: Code Quality
- **Description**: Code must include clear comments and documentation explaining complex logic and functionality. Focus on explaining the "why" rather than the "what".
- **Examples**:
  ```python
  def calculate_compound_interest(
      principal: float, 
      rate: float, 
      time: int, 
      compounds_per_year: int = 12
  ) -> float:
      """
      Calculate compound interest using the standard formula.
      
      Args:
          principal: Initial investment amount
          rate: Annual interest rate (as decimal, e.g., 0.05 for 5%)
          time: Investment period in years
          compounds_per_year: Number of times interest compounds per year
      
      Returns:
          Final amount after compound interest
      
      Example:
          >>> calculate_compound_interest(1000, 0.05, 2, 12)
          1104.89
      """
      # Using the compound interest formula: A = P(1 + r/n)^(nt)
      # We compound monthly by default as it's most common for savings accounts
      amount = principal * (1 + rate / compounds_per_year) ** (compounds_per_year * time)
      return round(amount, 2)
  ```

### CQ5: Use Clear, Descriptive Naming Conventions
- **Rule**: Use clear, descriptive naming conventions
- **Category**: Code Quality
- **Description**: Variables, functions, classes, and other code elements must have clear, descriptive names that indicate their purpose and usage without needing additional context.
- **Examples**:
  ```python
  # ❌ Bad - unclear abbreviations and generic names
  class UsrMgr:
      def __init__(self):
          self.data = []
      
      def proc(self, id):
          pass
  
  # ✅ Good - descriptive and clear names
  class UserManager:
      def __init__(self):
          self.active_user_ids = []
      
      def process_user_registration(self, user_id: str) -> None:
          """Process a new user registration."""
          pass
      
      def deactivate_expired_accounts(self) -> None:
          """Deactivate accounts that have expired."""
          pass
  ```

### CQ6: Implement Proper Folder Structure
- **Rule**: Implement proper folder structure
- **Category**: Code Quality
- **Description**: Project files must be organized in a logical, maintainable folder structure that follows established patterns and makes it easy for team members to find and maintain code.
- **Examples**:
  ```
  # ❌ Bad - flat structure with mixed concerns
  /src
    user_service.py
    user_component.py
    api_utils.py
    user_model.py
    database.py
    styles.css
  
  # ✅ Good - organized by feature and concern
  /src
    /components
      /user
        user_profile.py
        user_list.py
        __init__.py
    /services
      user_service.py
      auth_service.py
      __init__.py
    /models
      user.py
      session.py
      __init__.py
    /utils
      api.py
      validation.py
      __init__.py
    /config
      database.py
      settings.py
      __init__.py
    /tests
      /unit
      /integration
      conftest.py
  ```

### CQ7: Separate Concerns Appropriately
- **Rule**: Separate concerns appropriately
- **Category**: Code Quality
- **Description**: Code must follow separation of concerns principle with distinct responsibilities. Each module, class, and function should have a single, well-defined responsibility.
- **Examples**:
  ```python
  # ❌ Bad - mixed concerns in one function
  import bcrypt
  import logging
  from datetime import datetime
  
  def handle_user_login(email, password):
      # Validation logic
      if '@' not in email:
          return False
      
      # Database logic
      user = database.query('SELECT * FROM users WHERE email = %s', (email,))
      
      # Authentication logic
      is_valid = bcrypt.checkpw(password.encode(), user['password'].encode())
      
      # Logging logic
      logging.info(f'Login attempt for {email} at {datetime.now()}')
      
      # UI logic (mixed with business logic)
      if is_valid:
          print('Login successful')
          redirect_to_dashboard()
      
      return is_valid
  
  # ✅ Good - separated concerns
  class ValidationService:
      @staticmethod
      def validate_email(email: str) -> bool:
          return email and '@' in email and '.' in email
  
  class UserRepository:
      @staticmethod
      def find_by_email(email: str) -> dict:
          return database.query('SELECT * FROM users WHERE email = %s', (email,))
  
  class AuthService:
      @staticmethod
      def validate_password(password: str, hashed_password: str) -> bool:
          return bcrypt.checkpw(password.encode(), hashed_password.encode())
  
  class Logger:
      @staticmethod
      def log_login_attempt(email: str, success: bool) -> None:
          status = 'SUCCESS' if success else 'FAILED'
          logging.info(f'Login attempt for {email}: {status} at {datetime.now()}')
  
  class LoginController:
      def __init__(self, user_repo, auth_service, logger):
          self.user_repo = user_repo
          self.auth_service = auth_service
          self.logger = logger
      
      def handle_login(self, email: str, password: str) -> dict:
          if not ValidationService.validate_email(email):
              return {'success': False, 'error': 'Invalid email format'}
          
          user = self.user_repo.find_by_email(email)
          if not user:
              return {'success': False, 'error': 'User not found'}
          
          is_valid = self.auth_service.validate_password(password, user['password'])
          self.logger.log_login_attempt(email, is_valid)
          
          return {'success': is_valid, 'user': user if is_valid else None}
  ```

### CQ8: Follow DRY (Don't Repeat Yourself) Principles
- **Rule**: Follow DRY (Don't Repeat Yourself) principles
- **Category**: Code Quality
- **Description**: Code duplication must be minimized through proper abstraction and reuse. Extract common functionality into reusable functions, classes, or modules.
- **Examples**:
  ```python
  # ❌ Bad - repeated validation logic
  def create_user(name, email, age):
      if not name or len(name) < 2:
          raise ValueError("Name must be at least 2 characters")
      if not email or '@' not in email:
          raise ValueError("Invalid email format")
      if age < 18 or age > 120:
          raise ValueError("Age must be between 18 and 120")
      # ... create user logic
  
  def update_user(user_id, name, email, age):
      if not name or len(name) < 2:
          raise ValueError("Name must be at least 2 characters")
      if not email or '@' not in email:
          raise ValueError("Invalid email format")
      if age < 18 or age > 120:
          raise ValueError("Age must be between 18 and 120")
      # ... update user logic
  
  # ✅ Good - extracted validation logic
  class UserValidator:
      @staticmethod
      def validate_name(name: str) -> None:
          if not name or len(name) < 2:
              raise ValueError("Name must be at least 2 characters")
  
      @staticmethod
      def validate_email(email: str) -> None:
          if not email or '@' not in email:
              raise ValueError("Invalid email format")
  
      @staticmethod
      def validate_age(age: int) -> None:
          if age < 18 or age > 120:
              raise ValueError("Age must be between 18 and 120")
  
      @classmethod
      def validate_user_data(cls, name: str, email: str, age: int) -> None:
          cls.validate_name(name)
          cls.validate_email(email)
          cls.validate_age(age)
  
  def create_user(name: str, email: str, age: int):
      UserValidator.validate_user_data(name, email, age)
      # ... create user logic
  
  def update_user(user_id: str, name: str, email: str, age: int):
      UserValidator.validate_user_data(name, email, age)
      # ... update user logic
  ```

### CQ9: Follow SOLID Principles
- **Rule**: Follow SOLID principles
- **Category**: Code Quality
- **Description**: Code must adhere to SOLID design principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) for maintainability and extensibility.
- **Examples**:
  ```python
  from abc import ABC, abstractmethod
  
  # ❌ Bad - violates Single Responsibility Principle
  class User:
      def __init__(self, name, email):
          self.name = name
          self.email = email
      
      # User data management
      def update_profile(self, new_data):
          pass
      
      # Email functionality (different responsibility)
      def send_welcome_email(self):
          pass
      
      # Database operations (different responsibility)
      def save_to_database(self):
          pass
      
      # Validation (different responsibility)
      def validate_email(self):
          pass
  
  # ✅ Good - follows Single Responsibility Principle
  class User:
      def __init__(self, name: str, email: str):
          self.name = name
          self.email = email
      
      def update_profile(self, new_data: dict) -> None:
          self.name = new_data.get('name', self.name)
          self.email = new_data.get('email', self.email)
  
  class EmailService:
      def send_welcome_email(self, user: User) -> None:
          pass
  
  class UserRepository:
      def save(self, user: User) -> None:
          pass
      
      def find_by_id(self, user_id: str) -> User:
          pass
  
  class UserValidator:
      def validate_email(self, email: str) -> bool:
          pass
  
  # Open/Closed Principle example
  class PaymentProcessor(ABC):
      @abstractmethod
      def process(self, amount: float) -> dict:
          pass
  
  class CreditCardProcessor(PaymentProcessor):
      def process(self, amount: float) -> dict:
          return {"status": "success", "method": "credit_card", "amount": amount}
  
  class PayPalProcessor(PaymentProcessor):
      def process(self, amount: float) -> dict:
          return {"status": "success", "method": "paypal", "amount": amount}
  
  # Easy to add new processors without modifying existing code
  class CryptoProcessor(PaymentProcessor):
      def process(self, amount: float) -> dict:
          return {"status": "success", "method": "crypto", "amount": amount}
  ```

### CQ10: Use Design Patterns Appropriately
- **Rule**: Use design patterns appropriately
- **Category**: Code Quality
- **Description**: Design patterns should be used when they provide clear benefits to code structure, but avoid over-engineering with unnecessary patterns.
- **Examples**:
  ```python
  from typing import Dict, List, Callable
  from abc import ABC, abstractmethod
  
  # ✅ Good - Observer pattern for event handling
  class EventEmitter:
      def __init__(self):
          self.listeners: Dict[str, List[Callable]] = {}
      
      def on(self, event: str, callback: Callable) -> None:
          if event not in self.listeners:
              self.listeners[event] = []
          self.listeners[event].append(callback)
      
      def emit(self, event: str, data=None) -> None:
          if event in self.listeners:
              for callback in self.listeners[event]:
                  callback(data)
  
  # ✅ Good - Factory pattern for object creation
  class DatabaseConnection(ABC):
      @abstractmethod
      def connect(self):
          pass
  
  class MySQLConnection(DatabaseConnection):
      def __init__(self, config):
          self.config = config
      
      def connect(self):
          return f"Connected to MySQL: {self.config['host']}"
  
  class PostgreSQLConnection(DatabaseConnection):
      def __init__(self, config):
          self.config = config
      
      def connect(self):
          return f"Connected to PostgreSQL: {self.config['host']}"
  
  class DatabaseConnectionFactory:
      @staticmethod
      def create(db_type: str, config: dict) -> DatabaseConnection:
          if db_type == 'mysql':
              return MySQLConnection(config)
          elif db_type == 'postgresql':
              return PostgreSQLConnection(config)
          else:
              raise ValueError(f"Unsupported database type: {db_type}")
  ```

### CQ11: Implement Proper Abstraction Layers
- **Rule**: Implement proper abstraction layers
- **Category**: Code Quality
- **Description**: Code must have appropriate abstraction layers to manage complexity and hide implementation details while providing clean interfaces.
- **Examples**:
  ```python
  from abc import ABC, abstractmethod
  from typing import Optional, List
  
  # ✅ Good - proper abstraction layers
  
  # Data Access Layer (DAL)
  class UserRepository(ABC):
      @abstractmethod
      def find_by_id(self, user_id: str) -> Optional[dict]:
          pass
      
      @abstractmethod
      def save(self, user_data: dict) -> dict:
          pass
  
  class PostgreSQLUserRepository(UserRepository):
      def __init__(self, database):
          self.db = database
      
      def find_by_id(self, user_id: str) -> Optional[dict]:
          return self.db.query("SELECT * FROM users WHERE id = %s", [user_id])
      
      def save(self, user_data: dict) -> dict:
          # Database-specific implementation hidden
          result = self.db.query(
              "INSERT INTO users (name, email) VALUES (%s, %s) RETURNING *",
              [user_data['name'], user_data['email']]
          )
          return result
  
  # Business Logic Layer (BLL)
  class UserService:
      def __init__(self, user_repository: UserRepository, email_service):
          self.user_repo = user_repository
          self.email_service = email_service
      
      def register_user(self, user_data: dict) -> dict:
          # Business rules and validation
          existing_user = self.user_repo.find_by_email(user_data['email'])
          if existing_user:
              raise ValueError("Email already exists")
          
          user = self.user_repo.save(user_data)
          self.email_service.send_welcome_email(user)
          return user
  
  # Presentation Layer (API/Controller)
  class UserController:
      def __init__(self, user_service: UserService):
          self.user_service = user_service
      
      def create_user_endpoint(self, request_data: dict) -> tuple:
          try:
              user = self.user_service.register_user(request_data)
              return {"success": True, "user_id": user['id']}, 201
          except ValueError as e:
              return {"success": False, "error": str(e)}, 400
  ```