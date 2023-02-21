import './assets/scss/style.scss'
import { io, Socket } from 'socket.io-client'
import {
	ChatMessageData,
	ClientToServerEvents,
	ServerToClientEvents
} from '@backend/types/shared/SocketTypes'

const SOCKET_HOST = import.meta.env.VITE_APP_SOCKET_HOST

const messageEl = document.querySelector('#message') as HTMLInputElement
const messageFormEl = document.querySelector('#message-form') as HTMLFormElement
const messagesEl = document.querySelector('#messages') as HTMLDivElement

// Connect to Socket.IO server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST)

// Listen for when connection is established
socket.on('connect', () => {
	console.log('Connected to the server with ID:', socket.id)
})

// Listen for when the server disconnected
socket.on('disconnect', () => {
	console.log('Disconnected from the server')
})

// Listen for when server says hello
socket.on('hello', () => {
	console.log('The server says hello')
})

// Listen for new chat messages
socket.on('chatMessage', (message) => {
	console.log('New chat message:', message)
	// addMessageToChat()
})

// Send a message to the server when form is submitted
messageFormEl.addEventListener('submit', e => {
	e.preventDefault()

	if (!messageEl.value.trim()) {
		return
	}

	// Construct message payload
	const message: ChatMessageData = {
		content: messageEl.value,
	}

	// Send (emit) the message to the server
	socket.emit('sendChatMessage', message)

	// addMessageToChat(message, true)

	console.log("Emitted 'sendChatMessage' event to server", message)

	// Clear the input field and focus
	messageEl.value = ''
	messageEl.focus()
})