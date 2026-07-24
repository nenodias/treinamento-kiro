# Trello Workflow

This guide covers how to use the Trello MCP server to manage cards throughout the development workflow.

## Default Board

Always use the following board as the default for all operations:

- **Board ID**: `6a46731096111dc5fee99116`
- **Board Name**: Kiro Spec Driven

When starting any workflow, set this board as active before performing other operations. Skip the "List Available Boards" step unless the user explicitly asks to work with a different board.

## Understanding Board Structure

Trello is organized as: **Boards → Lists → Cards**

- **Board**: Your project (e.g., "Backend Sprint 12")
- **Lists**: Columns representing status (e.g., "To Do", "In Progress", "Done")
- **Cards**: Individual tasks with title, description, labels, and members

## Step-by-Step: Fetching a Card

### 1. List Available Boards

First, discover which boards are available:

```
Tool: list_boards
```

This returns all boards the authenticated user has access to. Note the board ID for your target project.

### 2. Set the Active Board

Set the board you want to work with:

```
Tool: set_active_board
Parameters: { "boardId": "<board-id>" }
```

### 3. Get Lists from the Board

Retrieve all lists (columns) from the board:

```
Tool: get_lists
```

Identify the list that contains cards ready for development (usually "To Do", "Backlog", or "Ready for Dev").

### 4. Fetch Cards from a List

Get all cards in the target list:

```
Tool: get_cards_by_list_id
Parameters: { "listId": "<list-id>" }
```

Each card contains:
- `id` — Unique card identifier
- `name` — Card title (use this for branch naming)
- `description` — Full requirements and acceptance criteria
- `labels` — Priority, type, or category indicators
- `dueDate` — Deadline if set

### 5. Choose a Card

Select the card you want to implement. Read its description carefully to understand:
- What needs to be built
- Acceptance criteria
- Any technical notes or constraints

## Managing Card Status

### Move Card to "In Progress"

Before starting work, move the card to signal you're working on it:

```
Tool: move_card
Parameters: { "cardId": "<card-id>", "listId": "<in-progress-list-id>" }
```

### Assign Yourself to the Card

Optionally, assign yourself as the card owner:

```
Tool: assign_member_to_card
Parameters: { "cardId": "<card-id>", "memberId": "<your-member-id>" }
```

To find your member ID, use `get_board_members`.

### Move Card to "Done" or "Review"

After pushing code, move the card to reflect completion:

```
Tool: move_card
Parameters: { "cardId": "<card-id>", "listId": "<done-or-review-list-id>" }
```

## Deriving Branch Names from Cards

Use the card title to create a meaningful branch name:

| Card Title | Branch Name |
|-----------|-------------|
| "Add user authentication" | `feat/add-user-authentication` |
| "Fix login timeout bug" | `fix/fix-login-timeout-bug` |
| "Update API documentation" | `chore/update-api-documentation` |

**Convention:**
- Prefix with `feat/`, `fix/`, `chore/`, `refactor/` based on card labels or content
- Slugify the title: lowercase, replace spaces with hyphens, remove special characters
- Keep it under 50 characters if possible

## Tips

- Use card labels to determine commit type (feature, bugfix, chore)
- Include the card URL in your PR description for traceability
- Check card comments for additional context from team members
- If a card has a checklist, use it as a TODO list for implementation steps
