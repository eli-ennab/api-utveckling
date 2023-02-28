import { Room, User } from '@prisma/client'

// Re-export Prisma models so frontend is happy
export { Room, User }

// Events emitted by the server to the client
export interface ServerToClientEvents {
	hello: () => void
	chatMessage: (message: ChatMessageData) => void
	userJoined: (notice: NoticeData) => void
	onlineUsers: (users: User[]) => void
}

// Events emitted by the client to the server
export interface ClientToServerEvents {
	getRoomList: (callback: (rooms: Room[]) => void) => void
	sendChatMessage: (message: ChatMessageData) => void
	userJoin: (username: string, roomId: string, callback: (result: UserJoinResult) => void) => void
}

// Events between servers
export interface InterServerEvents {
}

// Message payload
export interface ChatMessageData {
	content: string
	roomId: string
	timestamp: number
	username: string
}

// Notice payload
export interface NoticeData {
	username: string,
	timestamp: number
}

// Room info payload
export interface RoomInfoData extends Room {
	users: User[]
}

export interface UserJoinResult {
	success: boolean
	data: RoomInfoData | null
}
