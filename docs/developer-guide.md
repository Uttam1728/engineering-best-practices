---
sidebar_position: 2
id: developer-guide
title: Daily DevOps Enforcement Checklist
description: Essential daily workflow checklist for developers covering branch rules, security, testing, and coding best practices.
---

# ✅ Daily DevOps Enforcement Checklist

A **short, high-impact checklist** tailored for daily developer workflows and enforcement. This is what every developer should **follow and feel daily**.

:::tip Quick Reference
Bookmark this page and review it daily to ensure you're following all essential development practices.
:::

---

## 🔒 Branch & PR Rules

:::danger Critical Rules
These rules are **non-negotiable** and should be enforced at the repository level.
:::

### Branch Protection

- 🚫 **No direct pushes** to `main`, `fexz0`, `pre-production`
- ✅ **PR must be up to date** with base branch before merging
- ✅ **1+ approval(s)** required from code owners
- ✅ **Pass CI checks** (tests, lint, sonar) before merge allowed
- ✅ **Linear history only** (no merge commits - use squash or rebase)

### PR Quality Gates

```bash
# Example branch protection settings
- Require pull request reviews before merging
- Dismiss stale PR approvals when new commits are pushed  
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Restrict pushes that create merge commits
```

---

## 🧪 Pre-commit Checks

:::info Automation First
Set up pre-commit hooks to catch issues before they reach the repository.
:::

### Required Checks

- ✅ **Lint + Format** (ESLint, Prettier, Black, gofmt)
- ✅ **Static analysis** (SonarQube, Semgrep, CodeQL)
- ✅ **Type checking** (TypeScript, MyPy, Go vet)
- ✅ **Secrets scanning** (gitleaks, truffleHog, detect-secrets)

### Setup Example

```bash
# Install pre-commit
pip install pre-commit

# Add to .pre-commit-config.yaml
repos:
  - repo: https://github.com/psf/black
    rev: 22.3.0
    hooks:
      - id: black
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.2.0
    hooks:
      - id: detect-secrets
```

---

## 🔐 Security

:::warning Security First
Security should be built into every step of the development process.
:::

### Automated Security

- 🔄 **Auto-update vulnerable packages** (Dependabot, Snyk, Renovate)
- 🔍 **No secrets in code** (enforced via pre-commit hooks)
- 🔐 **2FA + SSO required** for all repository access
- 🛡️ **Dependency scanning** in CI/CD pipeline

### Security Checklist

```markdown
- [ ] No API keys, passwords, or tokens in code
- [ ] All dependencies are up to date
- [ ] Security headers configured (HTTPS, CORS, CSP)
- [ ] Input validation and sanitization implemented
- [ ] Error messages don't expose sensitive information
```

---

## 🧰 Coding Best Practices

:::note Code Quality
These practices should be enforced through code review and automated tooling.
:::

### Daily Coding Standards

- ✅ **Structured logging** (no print statements in production)
- ✅ **No hardcoded strings** — use constants/enums
- ✅ **Use feature flags** for experimental features
- ✅ **Modular, short functions** (readable + testable)
- ✅ **Meaningful variable names** (no single letters except loops)
- ✅ **Remove dead code** and unused imports

### Code Examples

```python
# ❌ Bad
print("User logged in")
if status == "active":
    do_something()

# ✅ Good  
logger.info("User authentication successful", extra={"user_id": user.id})
if status == UserStatus.ACTIVE:
    do_something()
```

```javascript
// ❌ Bad
function processData(d) {
    // 50 lines of code...
}

// ✅ Good
function validateUserInput(userData) {
    // 5-10 lines of focused logic
}

function transformUserData(validatedData) {
    // 5-10 lines of focused logic  
}
```

---

## 🧪 Testing

:::success Test-Driven Quality
Testing is not optional - it's a core part of development.
:::

### Testing Requirements

- ✅ **Write + run tests locally** before pushing
- ✅ **Maintain test coverage >80%** (meaningful coverage)
- ✅ **Use mocks/fixtures** for external API calls
- ✅ **Test edge cases** and error conditions
- ✅ **Integration tests** for critical user flows

### Testing Checklist

```markdown
- [ ] Unit tests for all new functions/methods
- [ ] Integration tests for API endpoints
- [ ] Mocks for external dependencies
- [ ] Test data cleanup after test runs
- [ ] Tests pass in CI environment
- [ ] Performance tests for critical paths
```

---

## 📄 Pull Requests

:::tip PR Excellence
Great PRs make code review efficient and knowledge sharing effective.
:::

### PR Requirements

- ✅ **Clear PR title + description** explaining what and why
- ✅ **Link to Jira/GitHub issue** for traceability
- ✅ **Testing checklist** included in description
- ✅ **Screenshots/demos** for UI changes
- 🚫 **No large PRs** without proper context and breakdown

### PR Template Example

```markdown
## Description
Brief description of changes and motivation.

## Type of Change
- [ ] Bug fix
- [ ] New feature  
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Edge cases considered

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or properly documented)

## Related Issues
Fixes #123
```

---

## 🧭 Tooling & Setup

:::info Developer Experience
Optimize setup and tooling to reduce friction and increase productivity.
:::

### Project Setup Standards

- ✅ **Use boilerplate/template repos** for new services
- ✅ **Makefile or npm scripts** for common tasks
- ✅ **`.env.example`** file with all required variables
- ✅ **Comprehensive README.md** with setup instructions
- ✅ **API documentation** (OpenAPI/Swagger)

### Required Files Checklist

```markdown
Project Root:
- [ ] README.md (setup, usage, contributing)
- [ ] .env.example (environment variables template)
- [ ] .gitignore (language/framework appropriate)
- [ ] Makefile or package.json scripts
- [ ] CONTRIBUTING.md (development guidelines)
- [ ] LICENSE (if open source)
- [ ] docker-compose.yml (for local development)
```

### Common Make Targets

```makefile
# Essential Makefile targets
.PHONY: install test lint format clean dev

install:
	pip install -r requirements.txt

test:
	pytest --cov=src tests/

lint:
	flake8 src/ tests/
	mypy src/

format:
	black src/ tests/
	isort src/ tests/

dev:
	docker-compose up -d
	python manage.py runserver

clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
```

---

## 🎯 Quick Daily Checklist

:::tip Daily Routine
Print this out or keep it handy for daily reference.
:::

### Before Starting Work
- [ ] Pull latest changes from main branch
- [ ] Check for security updates/alerts
- [ ] Review assigned PRs and issues

### Before Committing
- [ ] Run tests locally
- [ ] Run linter and formatter
- [ ] Check for secrets or sensitive data
- [ ] Write meaningful commit message

### Before Creating PR
- [ ] Rebase/merge latest main
- [ ] Ensure all tests pass
- [ ] Write clear PR description
- [ ] Add reviewers and labels

### Before Merging PR
- [ ] All CI checks pass
- [ ] Required approvals received
- [ ] No merge conflicts
- [ ] Documentation updated if needed

---

## 🚀 Enforcement Tools

### Repository Settings
- Branch protection rules enabled
- Required status checks configured
- Merge restrictions in place
- Automated security scanning enabled

### CI/CD Pipeline
- Automated testing on all PRs
- Code quality gates
- Security scanning
- Deployment automation

### Development Environment
- Pre-commit hooks installed
- IDE/editor configured with linters
- Local testing environment setup
- Documentation easily accessible

---

*This checklist should be reviewed and updated regularly to reflect evolving best practices and team needs.*
