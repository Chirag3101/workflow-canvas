#!/bin/bash

# Create main category directories if they don't exist
mkdir -p docs/tutorials
mkdir -p docs/guides
mkdir -p docs/project-tracking
mkdir -p docs/reference

# Move files to appropriate directories
# Tutorials
mv docs/project_setup.md docs/tutorials/
mv docs/visualization_approach.md docs/tutorials/

# Guides
mv docs/ideas_and_motivation.md docs/guides/
mv docs/product_requirements.md docs/guides/

# Reference
mv docs/git_commands.md docs/reference/
mv docs/sql_commands.md docs/reference/

# Create index files for each category
echo "# Tutorials
This section contains step-by-step guides for getting started with Workflow Canvas.

## Available Tutorials
- [Project Setup](project_setup.md)
- [Visualization Approach](visualization_approach.md)
" > docs/tutorials/README.md

echo "# Guides
This section contains detailed guides and documentation about Workflow Canvas.

## Available Guides
- [Ideas and Motivation](ideas_and_motivation.md)
- [Product Requirements](product_requirements.md)
" > docs/guides/README.md

echo "# Reference
This section contains reference documentation and commonly used commands.

## Available Reference Docs
- [Git Commands](git_commands.md)
- [SQL Commands](sql_commands.md)
" > docs/reference/README.md

echo "# Project Tracking
This section contains project tracking and development logs.
" > docs/project-tracking/README.md

# Update main README
echo "# Workflow Canvas Documentation

Welcome to the Workflow Canvas documentation! This documentation is organized into the following sections:

## 📚 Tutorials
Step-by-step guides to help you get started with Workflow Canvas.
[Browse Tutorials](tutorials/README.md)

## 📖 Guides
Detailed documentation about concepts, features, and best practices.
[Browse Guides](guides/README.md)

## 📊 Project Tracking
Development logs and project progress tracking.
[View Project Tracking](project-tracking/README.md)

## 📑 Reference
Reference documentation and commonly used commands.
[Browse Reference](reference/README.md)

## Need Help?
- Use the Help button in the application for quick assistance
- Browse through our tutorials for step-by-step guides
- Check the reference section for common commands
- Contact support for additional help
" > docs/README.md
