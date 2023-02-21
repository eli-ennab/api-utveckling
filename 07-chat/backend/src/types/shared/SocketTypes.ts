export {}

// Events emitted by the server to the client
export interface ServerToClientEvents {
	hello: () => void
	chatMessage: (data: ChatMessageData) => void
}

// Events emitted by the client to the server
export interface ClientToServerEvents {
	sendChatMessage: (message: ChatMessageData) => void
}

// Events between servers
export interface InterServerEvents {
}

// Message payload
export interface ChatMessageData {
	content: string
	// timestamp: number
	// username: string
}
