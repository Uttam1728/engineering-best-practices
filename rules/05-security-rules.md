# Security Rules

## Overview
Essential rules for implementing security best practices in software development.

## Rules

### S1: Validate and Sanitize All Inputs
- **Rule**: Validate and sanitize all inputs
- **Category**: Security
- **Description**: All user inputs and external data must be validated and sanitized to prevent security vulnerabilities like SQL injection, XSS, and command injection attacks.
- **Examples**:
  ```javascript
  // ❌ Bad - vulnerable to SQL injection
  const query = `SELECT * FROM users WHERE email = '${userInput}'`;
  
  // ✅ Good - parameterized query
  const query = 'SELECT * FROM users WHERE email = ?';
  const result = await db.query(query, [userInput]);
  
  // ❌ Bad - vulnerable to XSS
  document.getElementById('content').innerHTML = userInput;
  
  // ✅ Good - sanitized output
  document.getElementById('content').textContent = sanitizeHtml(userInput);
  
  // Input validation example
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string') {
      throw new ValidationError('Email is required and must be a string');
    }
    if (!emailRegex.test(email)) {
      throw new ValidationError('Invalid email format');
    }
    if (email.length > 254) {
      throw new ValidationError('Email too long');
    }
    return email.toLowerCase().trim();
  }
  ```

### S2: Implement Proper Authentication
- **Rule**: Implement proper authentication
- **Category**: Security
- **Description**: Robust authentication mechanisms must be implemented to verify user identity. Use multi-factor authentication where possible and follow security best practices for session management.

### S3: Use Secure Coding Practices
- **Rule**: Use secure coding practices
- **Category**: Security
- **Description**: Development must follow established secure coding practices to prevent vulnerabilities. This includes proper error handling, secure data transmission, and following security frameworks.

### S4: Avoid Hardcoded Secrets
- **Rule**: Avoid hardcoded secrets
- **Category**: Security
- **Description**: API keys, passwords, and other secrets must never be hardcoded in source code. Use environment variables, secure vaults, or configuration management systems.
- **Examples**:
  ```javascript
  // ❌ Bad - hardcoded secrets
  const apiKey = "sk_live_abc123def456ghi789";
  const dbPassword = "mypassword123";
  
  // ✅ Good - using environment variables
  const apiKey = process.env.STRIPE_API_KEY;
  const dbPassword = process.env.DB_PASSWORD;
  
  if (!apiKey) {
    throw new Error('STRIPE_API_KEY environment variable is required');
  }
  
  // ✅ Good - using configuration management
  const config = {
    database: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      password: process.env.DB_PASSWORD,
      ssl: process.env.NODE_ENV === 'production'
    },
    stripe: {
      apiKey: process.env.STRIPE_API_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
    }
  };
  
  // Validate required secrets at startup
  const requiredEnvVars = ['DB_PASSWORD', 'STRIPE_API_KEY', 'JWT_SECRET'];
  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  ```
  
  ```yaml
  # docker-compose.yml example
  services:
    api:
      build: .
      environment:
        - DB_PASSWORD_FILE=/run/secrets/db_password
        - STRIPE_API_KEY_FILE=/run/secrets/stripe_key
      secrets:
        - db_password
        - stripe_key
  
  secrets:
    db_password:
      file: ./secrets/db_password.txt
    stripe_key:
      file: ./secrets/stripe_key.txt
  ```

### S5: Implement Role-Based Access Control
- **Rule**: Implement role-based access control
- **Category**: Security
- **Description**: Access to system resources must be controlled through role-based permissions. Implement proper authorization checks for all sensitive operations and follow the principle of least privilege.

### S6: Conduct Regular Security Audits
- **Rule**: Regular security audits
- **Category**: Security
- **Description**: Regular security audits must be conducted to identify and address vulnerabilities. This includes code reviews, dependency scanning, and penetration testing.
