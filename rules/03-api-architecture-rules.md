# API Design & Architecture Rules

## Overview
Essential rules for designing robust APIs and scalable backend architectures.

## Rules

### API1: Follow REST Principles
- **Rule**: Follow REST principles
- **Category**: API Design
- **Description**: APIs must adhere to RESTful design principles and conventions. Use proper HTTP methods, status codes, and resource-based URLs for predictable and intuitive API behavior.
- **Examples**:
  ```javascript
  // ✅ Good REST API design
  
  // Resource-based URLs
  GET    /api/v1/users           // Get all users
  GET    /api/v1/users/123       // Get specific user
  POST   /api/v1/users           // Create new user
  PUT    /api/v1/users/123       // Update entire user
  PATCH  /api/v1/users/123       // Partial update user
  DELETE /api/v1/users/123       // Delete user
  
  // Nested resources
  GET    /api/v1/users/123/posts // Get posts by user
  POST   /api/v1/users/123/posts // Create post for user
  
  // ❌ Bad - non-RESTful URLs
  GET /api/getUser?id=123
  POST /api/createUser
  POST /api/updateUser/123
  POST /api/deleteUser/123
  
  ```

### API2: Use Proper HTTP Status Codes
- **Rule**: Use proper HTTP status codes
- **Category**: API Design
- **Description**: HTTP responses must use appropriate and standardized status codes to clearly communicate the result of API operations to clients.
- **Examples**:
  ```javascript
  // Status code reference for common scenarios
  const StatusCodes = {
    // Success responses
    OK: 200,                    // GET requests, successful updates
    CREATED: 201,              // POST requests, resource created
    NO_CONTENT: 204,           // DELETE requests, updates without response body
    
    // Client error responses
    BAD_REQUEST: 400,          // Invalid request data
    UNAUTHORIZED: 401,         // Authentication required
    FORBIDDEN: 403,            // Authenticated but not authorized
    NOT_FOUND: 404,            // Resource doesn't exist
    METHOD_NOT_ALLOWED: 405,   // HTTP method not supported
    CONFLICT: 409,             // Resource conflict (duplicate email)
    UNPROCESSABLE_ENTITY: 422, // Validation errors
    TOO_MANY_REQUESTS: 429,    // Rate limiting
    
    // Server error responses
    INTERNAL_SERVER_ERROR: 500, // Generic server error
    SERVICE_UNAVAILABLE: 503    // Temporary service unavailability
  };
  
  ```

### API3: Implement API Versioning
- **Rule**: Implement versioning
- **Category**: API Design
- **Description**: APIs must implement proper versioning strategies for backward compatibility. Use URL versioning, header versioning, or content negotiation to manage API evolution.
- **Examples**:
  ```javascript
  // 1. URL Versioning (Most Common)
  app.use('/api/v1', v1Router);
  app.use('/api/v2', v2Router);
  
  ```

### API4: Document APIs Thoroughly
- **Rule**: Document APIs thoroughly
- **Category**: API Design
- **Description**: All APIs must have comprehensive and up-to-date documentation. Use tools like OpenAPI/Swagger, include examples, and maintain documentation alongside code.
- **Examples**:
  ```yaml
  # OpenAPI/Swagger specification example
  openapi: 3.0.0
  info:
    title: User Management API
    description: API for managing user accounts and profiles
    version: 1.0.0
    contact:
      name: API Support
      email: api-support@company.com
  
  servers:
    - url: https://api.company.com/v1
      description: Production server
    - url: https://staging-api.company.com/v1
      description: Staging server
  
  paths:
    /users:
      get:
        summary: List all users
        description: Retrieve a paginated list of users with optional filtering
        parameters:
          - name: page
            in: query
            description: Page number for pagination
            required: false
            schema:
              type: integer
              minimum: 1
              default: 1
          - name: limit
            in: query
            description: Number of users per page
            required: false
            schema:
              type: integer
              minimum: 1
              maximum: 100
              default: 20
          - name: status
            in: query
            description: Filter users by status
            required: false
            schema:
              type: string
              enum: [active, inactive, pending]
        responses:
          '200':
            description: Successful response
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    data:
                      type: array
                      items:
                        $ref: '#/components/schemas/User'
                    pagination:
                      $ref: '#/components/schemas/Pagination'
                examples:
                  success:
                    value:
                      data:
                        - id: "123"
                          name: "John Doe"
                          email: "john@example.com"
                          status: "active"
                      pagination:
                        page: 1
                        limit: 20
                        total: 150
     
  ```


### API5: Implement Microservices Where Appropriate
- **Rule**: Implement microservices where appropriate
- **Category**: Architecture
- **Description**: Microservices architecture should be used when it provides clear benefits like independent scaling, team autonomy, and technology diversity. Consider the complexity trade-offs.

### API6: Use Dependency Injection
- **Rule**: Use dependency injection
- **Category**: Architecture
- **Description**: Dependency injection patterns must be implemented for better testability and modularity. This enables loose coupling and easier unit testing with mocks.
