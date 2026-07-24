# GitHub Workflow

This guide covers how to use git via terminal commands to create branches, commit code, push changes, and create PRs.

## Prerequisites

- Git installed and configured with credentials
- GitHub CLI (`gh`) installed and authenticated (for PR creation)
- Know your repository owner and name (e.g., `owner/repo-name`)

## Step-by-Step: Branch, Commit, and Push

### 1. Create a Branch

Create a new branch from `main` (or your default branch):

```bash
git checkout main
git pull origin main
git checkout -b feat/add-user-authentication
```

**Branch naming convention:**
- `feat/<description>` — New features
- `fix/<description>` — Bug fixes
- `chore/<description>` — Maintenance tasks
- `refactor/<description>` — Code refactoring

### 2. Implement the Code

Implement the code changes based on the Trello card requirements.

### 3. Stage and Commit

```bash
# Stage specific files
git add src/auth/login.ts src/auth/register.ts

# Or stage all changes
git add .

# Commit with conventional message
git commit -m "feat: add user authentication endpoint"
```

**Commit message convention (Conventional Commits):**
- `feat: <description>` — New feature
- `fix: <description>` — Bug fix
- `chore: <description>` — Maintenance
- `refactor: <description>` — Refactoring
- `docs: <description>` — Documentation changes

Include the Trello card reference in the commit body if needed:
```bash
git commit -m "feat: add user authentication endpoint" -m "Implements login and registration flows.
Trello: https://trello.com/c/<card-short-id>"
```

### 4. Push to Remote

```bash
git push -u origin feat/add-user-authentication
```

### 5. Create a Pull Request

Use the GitHub CLI to create a PR:

```bash
gh pr create --title "feat: add user authentication" --body "## Summary
Implements user authentication as described in the Trello card.

## Trello Card
https://trello.com/c/<card-id>

## Changes
- Added login endpoint
- Added registration endpoint
- Added JWT token generation" --base main
```

### 6. (Optional) Check Repository Status

```bash
# Check current branch and status
git status

# View recent commits
git log --oneline -5

# Check remote branches
git branch -r
```

## Tips

- Always create PRs with a descriptive body linking to the Trello card
- Use `gh pr create --draft` if the work is still in progress
- Use `gh pr create --reviewer <username>` to request reviewers
- Add labels with `gh pr edit --add-label "feature"`
- If the repo uses branch protection, rebase before pushing: `git pull --rebase origin main`
- Use card labels to determine commit type (feature, bugfix, chore)
- Include the card URL in your PR description for traceability
