# Contributing to SanskritNova AI 🤝

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is valuable.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** with clear messages
7. **Push** to your fork
8. **Open** a Pull Request

## 🛠️ Development Setup

```bash
# Clone and setup
git clone https://github.com/YOUR_USERNAME/SanskritNova.git
cd SanskritNova

# Python environment
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"

# Install pre-commit hooks
pre-commit install
```

## 📝 Code Standards

### Python Code
- Follow PEP 8 style guide
- Use type hints where appropriate
- Write descriptive docstrings
- Keep functions small and focused
- Use meaningful variable names

### Git Commits
- Use semantic commit messages:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `test:` for test changes
  - `refactor:` for code refactoring
  - `chore:` for maintenance tasks

### Testing
- Write tests for all new features
- Ensure all tests pass before submitting
- Aim for high test coverage
- Test edge cases and error conditions

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected vs actual** behavior
4. **Environment details** (OS, Python version, etc.)
5. **Relevant logs** or error messages

### Bug Report Template

```markdown
## Bug Description
Brief description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll to '....'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- OS: [e.g., macOS 14.0, Ubuntu 22.04]
- Python version: [e.g., 3.11.5]
- Browser: [e.g., Chrome 120.0]

## Additional Context
Any other relevant information.
```

## ✨ Feature Requests

We welcome feature suggestions! Please:

1. **Check** existing issues first
2. **Describe** the use case clearly
3. **Explain** the proposed solution
4. **Consider** the impact on Indian users

### Feature Request Template

```markdown
## Feature Description
Clear description of the proposed feature.

## Problem Statement
What problem does this solve for Sanskrit learners?

## Proposed Solution
How should this work?

## Alternatives Considered
What other approaches did you consider?

## Impact
Who would benefit from this feature?
```

## 🌍 Contribution Areas

### 🐛 Bug Fixes
- Fix API endpoint issues
- Resolve transliteration errors
- Improve error handling
- Fix UI/UX problems

### ✨ New Features
- Add new learning tracks
- Enhance AI chat capabilities
- Improve offline functionality
- Add audio pronunciation
- Support more Indian languages

### 📝 Documentation
- Improve README and guides
- Add code comments
- Create tutorials
- Translate documentation to Hindi

### 🧪 Testing
- Add more test cases
- Improve test coverage
- Add integration tests
- Performance testing

### 🎨 Design & UX
- Improve mobile experience
- Enhance accessibility
- Better Hindi typography
- Cultural design improvements

### 🌐 Localization
- Add Tamil language support
- Add Telugu language support
- Add Bengali language support
- Improve Hindi translations
- Add regional language variants

## 🧪 Development Workflow

```bash
# Run tests before committing
make test

# Check code quality
make lint

# Format code
ruff check . --fix

# Security scan
bandit -r .

# Type checking
mypy api/
```

## 📧 Getting Help

### Questions?
- Check existing [Issues](https://github.com/mangeshraut712/SanskritNova/issues)
- Look at [Discussions](https://github.com/mangeshraut712/SanskritNova/discussions)
- Read the documentation

### Need Support?
- Create an issue with the `question` label
- Tag maintainers for help
- Join our Discord community (link coming soon)

## 🏆 Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Invited to contribute to future decisions
- Celebrated in our community

## 📜 License

By contributing, you agree that your contributions will be licensed under the same MIT License as the project.

---

**Thank you for contributing to Sanskrit education in India!** 🇮🇳

*Every contribution helps make Sanskrit learning more accessible and effective for learners across the country.*
