#!/usr/bin/env node

import {
    Server
} from "@modelcontextprotocol/sdk/server/index.js";
import {
    StdioServerTransport
} from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError
} from "@modelcontextprotocol/sdk/types.js";
import {
    TrelloClient
} from "./trello-client.js";
import {
    validateGetCardsListRequest,
    validateGetRecentActivityRequest,
    validateAddCardRequest,
    validateUpdateCardRequest,
    validateArchiveCardRequest,
    validateAddListRequest,
    validateArchiveListRequest,
    validateMoveCardRequest,
    validateAttachImageRequest,
    validateGetListsRequest,
    validateSetActiveBoardRequest,
    validateSetActiveWorkspaceRequest,
    validateListBoardsInWorkspaceRequest,
    validateGetBoardMembersRequest,
    validateAssignMemberRequest,
    validateRemoveMemberRequest,
    validateGetBoardLabelsRequest,
    validateCreateLabelRequest,
    validateUpdateLabelRequest,
    validateDeleteLabelRequest,
    validateGetCardHistoryRequest
} from "./validators.js";
class TrelloServer {
    constructor() {
        const e = process.env.TRELLO_API_KEY,
            t = process.env.TRELLO_TOKEN,
            r = process.env.TRELLO_BOARD_ID;
        if (!e || !t) throw new Error("TRELLO_API_KEY and TRELLO_TOKEN environment variables are required");
        this.trelloClient = new TrelloClient({
            apiKey: e,
            token: t,
            defaultBoardId: r,
            boardId: r
        }), this.server = new Server({
            name: "trello-server",
            version: "1.0.0"
        }, {
            capabilities: {
                tools: {}
            }
        }), this.setupToolHandlers(), this.server.onerror = e => {}, process.on("SIGINT", async () => {
            await this.server.close(), process.exit(0)
        })
    }
    setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [{
                name: "get_cards_by_list_id",
                description: "Fetch cards from a specific Trello list on a specific board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        listId: {
                            type: "string",
                            description: "ID of the Trello list"
                        }
                    },
                    required: ["listId"]
                }
            }, {
                name: "get_lists",
                description: "Retrieve all lists from the specified board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        }
                    },
                    required: []
                }
            }, {
                name: "get_recent_activity",
                description: "Fetch recent activity on the Trello board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        limit: {
                            type: "number",
                            description: "Number of activities to fetch (default: 10)"
                        }
                    },
                    required: []
                }
            }, {
                name: "add_card_to_list",
                description: "Add a new card to a specified list on a specific board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        listId: {
                            type: "string",
                            description: "ID of the list to add the card to"
                        },
                        name: {
                            type: "string",
                            description: "Name of the card"
                        },
                        description: {
                            type: "string",
                            description: "Description of the card"
                        },
                        dueDate: {
                            type: "string",
                            description: "Due date for the card (ISO 8601 format)"
                        },
                        labels: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            description: "Array of label IDs to apply to the card"
                        }
                    },
                    required: ["listId", "name"]
                }
            }, {
                name: "update_card_details",
                description: "Update an existing card's details on a specific board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        cardId: {
                            type: "string",
                            description: "ID of the card to update"
                        },
                        name: {
                            type: "string",
                            description: "New name for the card"
                        },
                        description: {
                            type: "string",
                            description: "New description for the card"
                        },
                        dueDate: {
                            type: "string",
                            description: "New due date for the card (ISO 8601 format)"
                        },
                        labels: {
                            type: "array",
                            items: {
                                type: "string"
                            },
                            description: "New array of label IDs for the card"
                        }
                    },
                    required: ["cardId"]
                }
            }, {
                name: "archive_card",
                description: "Send a card to the archive on a specific board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        cardId: {
                            type: "string",
                            description: "ID of the card to archive"
                        }
                    },
                    required: ["cardId"]
                }
            }, {
                name: "move_card",
                description: "Move a card to a different list, potentially on a different board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the target Trello board (where the listId resides, uses default if not provided)"
                        },
                        cardId: {
                            type: "string",
                            description: "ID of the card to move"
                        },
                        listId: {
                            type: "string",
                            description: "ID of the target list"
                        }
                    },
                    required: ["cardId", "listId"]
                }
            }, {
                name: "add_list_to_board",
                description: "Add a new list to the specified board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        name: {
                            type: "string",
                            description: "Name of the new list"
                        }
                    },
                    required: ["name"]
                }
            }, {
                name: "archive_list",
                description: "Send a list to the archive on a specific board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        listId: {
                            type: "string",
                            description: "ID of the list to archive"
                        }
                    },
                    required: ["listId"]
                }
            }, {
                name: "get_my_cards",
                description: "Fetch all cards assigned to the current user",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: []
                }
            }, {
                name: "attach_image_to_card",
                description: "Attach an image to a card from a URL on a specific board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board where the card exists (uses default if not provided)"
                        },
                        cardId: {
                            type: "string",
                            description: "ID of the card to attach the image to"
                        },
                        imageUrl: {
                            type: "string",
                            description: "URL of the image to attach"
                        },
                        name: {
                            type: "string",
                            description: 'Optional name for the attachment (defaults to "Image Attachment")'
                        }
                    },
                    required: ["cardId", "imageUrl"]
                }
            }, {
                name: "list_boards",
                description: "List all boards the user has access to",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: []
                }
            }, {
                name: "set_active_board",
                description: "Set the active board for future operations",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the board to set as active"
                        }
                    },
                    required: ["boardId"]
                }
            }, {
                name: "list_workspaces",
                description: "List all workspaces the user has access to",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: []
                }
            }, {
                name: "set_active_workspace",
                description: "Set the active workspace for future operations",
                inputSchema: {
                    type: "object",
                    properties: {
                        workspaceId: {
                            type: "string",
                            description: "ID of the workspace to set as active"
                        }
                    },
                    required: ["workspaceId"]
                }
            }, {
                name: "list_boards_in_workspace",
                description: "List all boards in a specific workspace",
                inputSchema: {
                    type: "object",
                    properties: {
                        workspaceId: {
                            type: "string",
                            description: "ID of the workspace to list boards from"
                        }
                    },
                    required: ["workspaceId"]
                }
            }, {
                name: "get_active_board_info",
                description: "Get information about the currently active board",
                inputSchema: {
                    type: "object",
                    properties: {},
                    required: []
                }
            }, {
                name: "get_board_members",
                description: "Get all members of a specific board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        }
                    },
                    required: []
                }
            }, {
                name: "assign_member_to_card",
                description: "Assign a member to a specific card",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        cardId: {
                            type: "string",
                            description: "ID of the card to assign the member to"
                        },
                        memberId: {
                            type: "string",
                            description: "ID of the member to assign to the card"
                        }
                    },
                    required: ["cardId", "memberId"]
                }
            }, {
                name: "remove_member_from_card",
                description: "Remove a member from a specific card",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        cardId: {
                            type: "string",
                            description: "ID of the card to remove the member from"
                        },
                        memberId: {
                            type: "string",
                            description: "ID of the member to remove from the card"
                        }
                    },
                    required: ["cardId", "memberId"]
                }
            }, {
                name: "get_board_labels",
                description: "Get all labels of a specific board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        }
                    },
                    required: []
                }
            }, {
                name: "create_label",
                description: "Create a new label on a board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        name: {
                            type: "string",
                            description: "Name of the label"
                        },
                        color: {
                            type: "string",
                            description: 'Color of the label (e.g., "red", "blue", "green", "yellow", "orange", "purple", "pink", "sky", "lime", "black", "null")'
                        }
                    },
                    required: ["name"]
                }
            }, {
                name: "update_label",
                description: "Update an existing label",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        labelId: {
                            type: "string",
                            description: "ID of the label to update"
                        },
                        name: {
                            type: "string",
                            description: "New name for the label"
                        },
                        color: {
                            type: "string",
                            description: "New color for the label"
                        }
                    },
                    required: ["labelId"]
                }
            }, {
                name: "delete_label",
                description: "Delete a label from a board",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        labelId: {
                            type: "string",
                            description: "ID of the label to delete"
                        }
                    },
                    required: ["labelId"]
                }
            }, {
                name: "get_card_history",
                description: "Get the history/actions of a specific card",
                inputSchema: {
                    type: "object",
                    properties: {
                        boardId: {
                            type: "string",
                            description: "ID of the Trello board (uses default if not provided)"
                        },
                        cardId: {
                            type: "string",
                            description: "ID of the card to get history for"
                        },
                        limit: {
                            type: "number",
                            description: "Optional: Number of actions to fetch (default: all)"
                        },
                        filter: {
                            type: "string",
                            description: 'Optional: Filter actions by type (e.g., "all", "updateCard:idList", "addAttachmentToCard", "commentCard", "updateCard:name", "updateCard:desc", "updateCard:due", "addMemberToCard", "removeMemberFromCard", "addLabelToCard", "removeLabelFromCard")'
                        }
                    },
                    required: ["cardId"]
                }
            }]
        })), this.server.setRequestHandler(CallToolRequestSchema, async e => {
            try {
                if (!e.params.arguments) throw new McpError(ErrorCode.InvalidParams, "Missing arguments");
                const t = e.params.arguments;
                switch (e.params.name) {
                    case "get_cards_by_list_id": {
                        const e = validateGetCardsListRequest(t),
                            r = await this.trelloClient.getCardsByList(e.boardId, e.listId);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "list_boards": {
                        const e = await this.trelloClient.listBoards();
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(e, null, 2)
                            }]
                        }
                    }
                    case "get_lists": {
                        const e = validateGetListsRequest(t),
                            r = await this.trelloClient.getLists(e.boardId);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "get_recent_activity": {
                        const e = validateGetRecentActivityRequest(t),
                            r = await this.trelloClient.getRecentActivity(e.boardId, e.limit);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "add_card_to_list": {
                        const e = validateAddCardRequest(t),
                            r = await this.trelloClient.addCard(e.boardId, e);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "update_card_details": {
                        const e = validateUpdateCardRequest(t),
                            r = await this.trelloClient.updateCard(e.boardId, e);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "archive_card": {
                        const e = validateArchiveCardRequest(t),
                            r = await this.trelloClient.archiveCard(e.boardId, e.cardId);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "move_card": {
                        const e = validateMoveCardRequest(t),
                            r = await this.trelloClient.moveCard(e.boardId, e.cardId, e.listId);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "add_list_to_board": {
                        const e = validateAddListRequest(t),
                            r = await this.trelloClient.addList(e.boardId, e.name);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "archive_list": {
                        const e = validateArchiveListRequest(t),
                            r = await this.trelloClient.archiveList(e.boardId, e.listId);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "get_my_cards": {
                        const e = await this.trelloClient.getMyCards();
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(e, null, 2)
                            }]
                        }
                    }
                    case "attach_image_to_card": {
                        const e = validateAttachImageRequest(t);
                        try {
                            const t = await this.trelloClient.attachImageToCard(e.boardId, e.cardId, e.imageUrl, e.name);
                            return {
                                content: [{
                                    type: "text",
                                    text: JSON.stringify(t, null, 2)
                                }]
                            }
                        } catch (e) {
                            return this.handleErrorResponse(e)
                        }
                    }
                    case "set_active_board": {
                        const e = validateSetActiveBoardRequest(t);
                        try {
                            const t = await this.trelloClient.setActiveBoard(e.boardId);
                            return {
                                content: [{
                                    type: "text",
                                    text: `Successfully set active board to "${t.name}" (${t.id})`
                                }]
                            }
                        } catch (e) {
                            return this.handleErrorResponse(e)
                        }
                    }
                    case "list_workspaces": {
                        const e = await this.trelloClient.listWorkspaces();
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(e, null, 2)
                            }]
                        }
                    }
                    case "set_active_workspace": {
                        const e = validateSetActiveWorkspaceRequest(t);
                        try {
                            const t = await this.trelloClient.setActiveWorkspace(e.workspaceId);
                            return {
                                content: [{
                                    type: "text",
                                    text: `Successfully set active workspace to "${t.displayName}" (${t.id})`
                                }]
                            }
                        } catch (e) {
                            return this.handleErrorResponse(e)
                        }
                    }
                    case "list_boards_in_workspace": {
                        const e = validateListBoardsInWorkspaceRequest(t);
                        try {
                            const t = await this.trelloClient.listBoardsInWorkspace(e.workspaceId);
                            return {
                                content: [{
                                    type: "text",
                                    text: JSON.stringify(t, null, 2)
                                }]
                            }
                        } catch (e) {
                            return this.handleErrorResponse(e)
                        }
                    }
                    case "get_active_board_info":
                        try {
                            const e = this.trelloClient.activeBoardId;
                            if (!e) throw new McpError(ErrorCode.InvalidParams, "No active board set");
                            const t = await this.trelloClient.getBoardById(e);
                            return {
                                content: [{
                                    type: "text",
                                    text: JSON.stringify({
                                        ...t,
                                        isActive: !0,
                                        activeWorkspaceId: this.trelloClient.activeWorkspaceId || "Not set"
                                    }, null, 2)
                                }]
                            }
                        } catch (e) {
                            return this.handleErrorResponse(e)
                        }
                    case "get_board_members": {
                        const e = validateGetBoardMembersRequest(t),
                            r = await this.trelloClient.getBoardMembers(e.boardId);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "assign_member_to_card": {
                        const e = validateAssignMemberRequest(t),
                            r = await this.trelloClient.assignMemberToCard(e.boardId, e.cardId, e.memberId);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "remove_member_from_card": {
                        const e = validateRemoveMemberRequest(t),
                            r = await this.trelloClient.removeMemberFromCard(e.boardId, e.cardId, e.memberId);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "get_board_labels": {
                        const e = validateGetBoardLabelsRequest(t),
                            r = await this.trelloClient.getBoardLabels(e.boardId);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "create_label": {
                        const e = validateCreateLabelRequest(t),
                            r = await this.trelloClient.createLabel(e.boardId, e.name, e.color);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "update_label": {
                        const e = validateUpdateLabelRequest(t),
                            r = await this.trelloClient.updateLabel(e.boardId, e.labelId, e.name, e.color);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    case "delete_label": {
                        const e = validateDeleteLabelRequest(t);
                        return await this.trelloClient.deleteLabel(e.boardId, e.labelId), {
                            content: [{
                                type: "text",
                                text: "Label deleted successfully"
                            }]
                        }
                    }
                    case "get_card_history": {
                        const e = validateGetCardHistoryRequest(t),
                            r = await this.trelloClient.getCardHistory(e.boardId, e.cardId, e.limit, e.filter);
                        return {
                            content: [{
                                type: "text",
                                text: JSON.stringify(r, null, 2)
                            }]
                        }
                    }
                    default:
                        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${e.params.name}`)
                }
            } catch (e) {
                return {
                    content: [{
                        type: "text",
                        text: e instanceof Error ? e.message : "Unknown error occurred"
                    }],
                    isError: !0
                }
            }
        })
    }
    handleErrorResponse(e) {
        return {
            content: [{
                type: "text",
                text: `Error: ${e instanceof Error ? e.message : "Unknown error occurred"}`
            }],
            isError: !0
        }
    }
    async run() {
        const e = new StdioServerTransport;
        await this.trelloClient.loadConfig().catch(e => {}), await this.server.connect(e)
    }
}
const server = new TrelloServer;
server.run().catch(() => {});