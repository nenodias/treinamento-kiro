---
name: "card-to-code"
displayName: "Card to Code"
description: "Workflow that takes a Trello card, implements the code, and pushes a commit to a GitHub branch. Combines Trello MCP with git/gh CLI for a seamless card-to-code pipeline."
keywords: ["trello", "github", "card", "commit", "branch", "workflow"]
author: "kiro-training"
---

# Card to Code

## Overview

This power enables a complete development workflow: pick a Trello card, implement the code changes, then commit and push to a branch on GitHub. It combines the Trello MCP server (for project management) with git and GitHub CLI commands (for code delivery).

**The workflow:**
1. Fetch a card from Trello (get requirements, acceptance criteria)
2. Implement the code changes based on the card description
3. Create a branch, commit, and push using git commands
4. Open a Pull Request using the GitHub CLI (`gh`)

## Available Steering Files

- **trello-workflow** — How to fetch cards, understand board structure, and manage card status
- **github-workflow** — How to create branches, commit changes, push to GitHub, and open PRs via terminal
- **node-api-development** — Guia de desenvolvimento de API em Node.js seguindo os padrões do time (arquitetura em camadas, nomenclatura, tratamento de erros)

## Onboarding

### Prerequisites

- **Node.js** installed (for Trello MCP server)
- **Git** installed and configured with credentials
- **GitHub CLI (`gh`)** installed and authenticated (for creating PRs)
- **Trello account** with API key and token
- **GitHub account** with access to the target repository

### Environment Variables

Set the following environment variables before using this power:

| Variable | Description | How to get it |
|----------|-------------|---------------|
| `TRELLO_API_KEY` | Your Trello API key | Visit https://trello.com/power-ups/admin → select your Power-Up → API Key |
| `TRELLO_TOKEN` | Your Trello authorization token | Generated from the API key page with "Token" link |

### Installation

1. Install the Trello MCP server globally:
   ```bash
   npm install -g mcp-server-trello
   ```

2. Install and authenticate the GitHub CLI:
   ```bash
   # Install gh (Windows with winget)
   winget install --id GitHub.cli

   # Authenticate
   gh auth login
   ```

3. Set your environment variables (add to your shell profile or `.env`):
   ```bash
   set TRELLO_API_KEY=your-api-key
   set TRELLO_TOKEN=your-token
   ```

## Common Workflows

### Full Card-to-Code Workflow

1. **List Trello boards** to find your project board
2. **Get lists** from the board to find the "To Do" or "In Progress" column
3. **Fetch a card** to understand the requirements
4. **Move the card** to "In Progress"
5. **Create a branch** locally with `git checkout -b <branch-name>`
6. **Implement the code** based on the card description
7. **Commit and push** changes with `git commit` and `git push`
8. **Create a Pull Request** with `gh pr create` linking back to the Trello card
9. **Move the card** to "Done" or "Review"

### Quick Reference

| Step | Tool | Command / MCP Tool |
|------|------|--------------------|
| Fetch card | Trello MCP | `get_cards_by_list_id` |
| Move card | Trello MCP | `move_card` |
| Create branch | Terminal | `git checkout -b <branch>` |
| Commit files | Terminal | `git add . && git commit -m "..."` |
| Push | Terminal | `git push -u origin <branch>` |
| Create PR | Terminal | `gh pr create --title "..." --body "..."` |

## Best Practices

- Always move the Trello card to "In Progress" before starting work
- Use the card title (slugified) as the branch name for traceability
- Include the Trello card URL in the PR description
- Move the card to "Review" or "Done" after pushing
- Keep commits atomic and tied to a single card

## Troubleshooting

### Trello: "Invalid token" error
**Cause:** Token expired or incorrect
**Solution:** Regenerate your token at https://trello.com/power-ups/admin

### GitHub CLI: "not authenticated" error
**Cause:** `gh` not logged in
**Solution:** Run `gh auth login` and follow the prompts

### Git: "Permission denied" on push
**Cause:** SSH key not configured or HTTPS credentials expired
**Solution:** Run `gh auth setup-git` to configure git credentials via GitHub CLI

### Trello: "Board not found"
**Cause:** API key doesn't have access to the board
**Solution:** Ensure the token has access to the workspace containing the board

## MCP Servers

- **trello-mcp** — Manages Trello boards, lists, and cards
