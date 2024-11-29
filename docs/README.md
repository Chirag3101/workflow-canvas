# Workflow Canvas Documentation Guide

This directory contains the documentation for the Workflow Canvas project. We use MkDocs with the Material theme for our documentation.

## Documentation Structure

```
docs/
├── README.md              # This file
├── index.md              # Home page
├── getting-started/      # Getting started guides
├── user-guide/          # User documentation
├── developer-guide/     # Developer documentation
├── api/                 # API reference
├── contributing/        # Contribution guidelines
└── about/              # Project information
```

## Setting Up Documentation Environment

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Serve documentation locally:
```bash
mkdocs serve
```

3. Build documentation:
```bash
mkdocs build
```

## Writing Documentation

### File Organization
- Place new documentation files in the appropriate directory
- Use lowercase with hyphens for filenames (e.g., `getting-started.md`)
- Include descriptive frontmatter in each file

### Markdown Guidelines
- Use ATX-style headers (`#` for h1, `##` for h2, etc.)
- Include a single h1 (`#`) at the top of each file
- Use fenced code blocks with language specification
- Add alt text to images
- Use relative links for internal references

### Code Examples
- Always specify the language for code blocks
- Include comments for complex code
- Use meaningful variable names
- Keep examples concise and focused

Example:
```python
# Initialize workflow configuration
workflow_config = {
    "name": "Example Workflow",
    "steps": ["Step 1", "Step 2"],
    "version": "1.0.0"
}
```

### Admonitions
Use admonitions for important information:

```markdown
!!! note
    This is a note admonition.

!!! warning
    This is a warning admonition.

!!! tip
    This is a tip admonition.
```

## Building and Deploying

### Local Development
```bash
mkdocs serve
```
Visit `http://127.0.0.1:8000` to see the documentation.

### Production Build
```bash
mkdocs build
```
The built site will be in the `site/` directory.

## Contributing to Documentation

1. Create a new branch for documentation changes:
```bash
git checkout -b docs/your-documentation-change
```

2. Make your changes following the guidelines above

3. Test locally using `mkdocs serve`

4. Submit a pull request with:
   - Clear description of changes
   - Screenshots if UI changes
   - Any related issues referenced

## Documentation TODOs

- [ ] Complete API reference documentation
- [ ] Add more code examples
- [ ] Create troubleshooting guide
- [ ] Add video tutorials
- [ ] Translate documentation

## Need Help?

- Check the [contribution guidelines](../CONTRIBUTING.md)
- Join our [community](#)
- Create an issue
- Contact the maintainers

## License

This documentation is licensed under the same terms as the main project.
