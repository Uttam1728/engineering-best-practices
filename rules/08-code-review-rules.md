# Code Review Rules

## Overview
Essential rules for conducting effective code reviews and ensuring quality before submission.

## Rules

### CR1: Self-Review the Code
- **Rule**: Self-review the code
- **Category**: Code Review
- **Description**: Developers must perform thorough self-review before submitting code for review. This catches obvious issues early and respects reviewers' time.
- **Examples**:
  ```bash
  # Pre-submission checklist
  # 1. Review your own diff
  git diff HEAD~1
  
  # 2. Check for debugging code
  grep -r "console.log\|debugger\|print(" src/
  
  # 3. Verify formatting
  npm run lint
  npm run format
  
  # 4. Run tests locally
  npm test
  
  # 5. Check for TODO/FIXME comments
  grep -r "TODO\|FIXME\|XXX" src/
  ```
  
  **Self-review questions:**
  - Does the code solve the intended problem?
  - Are variable and function names clear and descriptive?
  - Is the code properly commented where necessary?
  - Are there any hardcoded values that should be constants?
  - Have I removed all debugging statements?
  - Does the code follow our team's style guide?

### CR2: Run All Tests Locally
- **Rule**: Run all tests locally
- **Category**: Code Review
- **Description**: All tests must pass locally before code submission. This includes unit tests, integration tests, and any relevant end-to-end tests.

### CR3: Check for Code Formatting Issues
- **Rule**: Check for code formatting issues
- **Category**: Code Review
- **Description**: Code formatting must be checked and corrected before submission. Use automated formatters and configure them in your IDE and CI/CD pipeline.

### CR4: Ensure Documentation is Updated
- **Rule**: Ensure documentation is updated
- **Category**: Code Review
- **Description**: All relevant documentation must be updated to reflect code changes. This includes API docs, README files, and inline documentation.

### CR5: Review Code Functionality and Correctness
- **Rule**: Code functionality and correctness
- **Category**: Code Review
- **Description**: Code functionality and correctness must be verified during review. Check logic, algorithms, error handling, and edge cases.
- **Examples**:
  ```
  // Review checklist for functionality:
  // - Are all edge cases handled?
  // - Is the algorithm correct and efficient?
  // - Are there any off-by-one errors?
  // - Is error handling comprehensive?
  // - Are all code paths tested?
  ```

### CR6: Review Code Readability and Maintainability
- **Rule**: Code readability and maintainability
- **Category**: Code Review
- **Description**: Code must be reviewed for readability and long-term maintainability. Focus on clarity, simplicity, and ease of modification.
- **Examples**:
  ```python
  # ❌ Bad - unclear and hard to maintain
  def proc_usr_dat(d):
      res = []
      for i in d:
          if i['a'] > 18 and i['s'] == 'A':
              res.append(i['n'] + ' - ' + str(i['sc']))
      return res
  
  # ✅ Good - clear and maintainable
  def format_adult_students_with_a_grade(student_data):
      """
      Filter and format students who are adults with grade A.
      
      Args:
          student_data (list): List of student dictionaries with keys:
              - 'age': student age
              - 'status': enrollment status
              - 'name': student name  
              - 'score': numeric score
      
      Returns:
          list: Formatted strings with student names and scores
      """
      formatted_results = []
      
      for student in student_data:
          is_adult = student['age'] > 18
          has_a_grade = student['status'] == 'A'
          
          if is_adult and has_a_grade:
              formatted_entry = f"{student['name']} - {student['score']}"
              formatted_results.append(formatted_entry)
      
      return formatted_results
  
  # Maintainability review questions:
  # - Would a new team member understand this code?
  # - Is the code easy to modify for new requirements?
  # - Are complex algorithms explained with comments?
  # - Is the code properly structured with clear responsibilities?
  ```

### CR7: Consider Performance Implications
- **Rule**: Performance implications
- **Category**: Code Review
- **Description**: Performance impact of code changes must be evaluated during review. Look for inefficient algorithms, unnecessary operations, and potential bottlenecks.

### CR8: Review Security Considerations
- **Rule**: Security considerations
- **Category**: Code Review
- **Description**: Security implications must be assessed during code review. Check for common vulnerabilities, proper input validation, and secure coding practices.
- **Examples**:
  ```javascript
  // Security review checklist:
  
  // ❌ Bad - SQL injection vulnerability
  function getUser(email) {
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    return database.query(query);
  }
  
  // ✅ Good - parameterized query
  function getUser(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    return database.query(query, [email]);
  }
  
  // ❌ Bad - XSS vulnerability
  function displayUserInput(userInput) {
    document.getElementById('content').innerHTML = userInput;
  }
  
  // ✅ Good - XSS prevention
  function displayUserInput(userInput) {
    const sanitized = DOMPurify.sanitize(userInput);
    document.getElementById('content').innerHTML = sanitized;
  }
  
  // ❌ Bad - exposed sensitive information
  function handleError(error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
      dbConnectionString: process.env.DB_URL
    });
  }
  
  // ✅ Good - secure error handling
  function handleError(error) {
    logger.error('Application error:', error);
    res.status(500).json({
      error: 'Internal server error',
      requestId: generateRequestId()
    });
  }
  ```

### CR9: Verify Test Coverage and Quality
- **Rule**: Test coverage and quality
- **Category**: Code Review
- **Description**: Test coverage and quality must be verified as part of the review process. Ensure new code is properly tested and existing tests are updated.
- **Examples**:
  ```javascript
  // When reviewing new code, check:
  // 2. Are edge cases covered?
  // 3. Are error scenarios tested?
  // 4. Check test quality
  // ✅ Good test - specific and clear
  
  ```

### CR10: Implement Mandatory Code Reviews
- **Rule**: Implement mandatory code reviews
- **Category**: Code Review
- **Description**: All code changes must go through mandatory code review process. Configure branch protection rules to enforce this requirement.

### CR11: Use Pull Request Templates
- **Rule**: Use pull request templates
- **Category**: Code Review
- **Description**: Standardized pull request templates must be used for consistent reviews. Include sections for description, testing, and reviewer guidance.
- **Examples**:
  ```markdown
  <!-- .github/pull_request_template.md -->
  ## Description
  Brief description of changes made and why.
  
  Fixes #(issue_number)
  
  ## Type of Change
  - [ ] Bug fix (non-breaking change which fixes an issue)
  - [ ] New feature (non-breaking change which adds functionality)
  - [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
  - [ ] Documentation update
  - [ ] Performance improvement
  - [ ] Code refactoring
  
  ## Testing
  - [ ] Unit tests pass locally
  - [ ] Integration tests pass locally
  - [ ] Manual testing completed
  - [ ] Added new tests for new functionality
  
  ### Test Cases Covered
  - [ ] Happy path scenarios
  - [ ] Error handling scenarios  
  - [ ] Edge cases and boundary conditions
  - [ ] Performance testing (if applicable)
  
  ## Security Considerations
  - [ ] Input validation implemented
  - [ ] No sensitive data exposed
  - [ ] Authentication/authorization properly implemented
  - [ ] Security scan passed (if applicable)
  
  ## Documentation
  - [ ] Code comments added/updated
  - [ ] API documentation updated
  - [ ] README updated (if applicable)
  - [ ] Migration guide provided (for breaking changes)
  
  ## Reviewer Checklist
  - [ ] Code follows team coding standards
  - [ ] Code is readable and maintainable
  - [ ] Performance implications considered
  - [ ] Security implications reviewed
  - [ ] Test coverage is adequate
  - [ ] Documentation is complete and accurate
  
  ## Screenshots (if applicable)
  Before: [Add screenshot]
  After: [Add screenshot]
  
  ## Additional Notes
  Any additional information for reviewers.
  ```

### CR12: Check for Security Vulnerabilities
- **Rule**: Check for security vulnerabilities
- **Category**: Code Review
- **Description**: Code reviews must include security vulnerability assessment. Use automated tools and manual review to identify potential security issues.
