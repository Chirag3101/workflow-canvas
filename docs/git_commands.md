# Git Commands Playbook

## Basic Git Operations

### Initial Setup
```bash
# Initialize repository
git init

# Add remote repository
git remote add origin <your-github-repo-url>

# Verify remote
git remote -v
```

### Daily Operations
```bash
# Check status
git status

# Add files
git add .                  # Add all files
git add specific_file.txt  # Add specific file

# Commit changes
git commit -m "Your commit message"

# Push changes
git push origin main

# Pull latest changes
git pull origin main
```

### Branch Operations
```bash
# Create and switch to new branch
git checkout -b feature-name

# List branches
git branch

# Switch branches
git checkout branch-name

# Merge branch
git merge branch-name
```

### Fixing Mistakes
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- file-name

# Remove git initialization
rm -rf .git
```

## Common Workflows

### Starting New Feature
1. Pull latest changes:
```bash
git pull origin main
```

2. Create feature branch:
```bash
git checkout -b feature-name
```

3. Make changes and commit:
```bash
git add .
git commit -m "Implement feature X"
```

4. Push to GitHub:
```bash
git push origin feature-name
```

### Updating Main Branch
1. Switch to main:
```bash
git checkout main
```

2. Pull latest:
```bash
git pull origin main
```

3. Merge feature:
```bash
git merge feature-name
```

4. Push changes:
```bash
git push origin main
```

## Best Practices

1. **Commit Messages**
   - Use present tense ("Add feature" not "Added feature")
   - Be descriptive but concise
   - Start with verb (Add, Fix, Update, etc.)

2. **Branching**
   - Keep branches focused on single feature/fix
   - Delete branches after merging
   - Use descriptive branch names

3. **Pulling Updates**
   - Always pull before starting new work
   - Resolve conflicts immediately
   - Test after merging
