import './assets/scss/style.scss'
import { io, Socket } from 'socket.io-client'
import {
	ChatMessageData,
	ClientToServerEvents,
	ServerToClientEvents,
} from '@backend/types/shared/SocketTypes'

const SOCKET_HOST = import.meta.env.VITE_APP_SOCKET_HOST

// Forms
const messageEl = document.querySelector('#message') as HTMLInputElement
const messageFormEl = document.querySelector('#message-form') as HTMLFormElement
const usernameFormEl = document.querySelector('#username-form') as HTMLFormElement

// Lists
const messagesEl = document.querySelector('#messages') as HTMLUListElement

// Views
const startEl = document.querySelector('#start') as HTMLDivElement
const chatWrapperEl = document.querySelector('#chat-wrapper') as HTMLDivElement

// User Details
let username: string | null = null

// Connect to Socket.IO server
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_HOST)

// Add a message to the chat
const addMessageToChat = (message: ChatMessageData, ownMessage = false) => {
	// Create a new LI element
	const messageEl = document.createElement('li')

	// Set class of LI to 'message'
	messageEl.classList.add('message')

	// If the message is from the user, add the class 'own-message'
	if (ownMessage) {
		messageEl.classList.add('own-message')
	}

	// Set the text content of the LI element to the message
	messageEl.innerHTML = ownMessage
		? message.content
		: `<span class="user">${message.username}</span><span class="content">${message.content}</span>`

	// Append the LI element to the messages element
	messagesEl.appendChild(messageEl)

	// Scroll to the bottom of the messages list
	messageEl.scrollIntoView({ behavior: 'smooth' })
}

// Show chat view
const showChatView = () => {
	startEl.classList.add('hide')
	chatWrapperEl.classList.remove('hide')
}

// Show welcome view
const showWelcomeView = () => {
	chatWrapperEl.classList.add('hide')
	startEl.classList.remove('hide')
}

// Listen for when connection is established
socket.on('connect', () => {
	console.log('Connected to the server', socket.id)
})

// Listen for when the server got tired of us
socket.on('disconnect', () => {
	console.log('Disconnected from the server')
})

// Listen for when the server says hello
socket.on('hello', () => {
	console.log('Server said Hello')
})

// Listen for new chat messages
socket.on('chatMessage', (message) => {
	console.log('Someone wrote something', message)

	// Create a function called `addMessageToChat` that takes the
	// `message` as a parameter and creates a new LI-element, sets
	// the content + styling and appends it to `messagesEl`
	addMessageToChat(message)
})

// Send a message to the server when form is submitted
messageFormEl.addEventListener('submit', e => {
	e.preventDefault()

	if (!messageEl.value.trim() || !username) {
		return
	}

	// Construct message payload
	const message: ChatMessageData = {
		content: messageEl.value,
		username,
	}

	// Send (emit) the message to the server
	socket.emit('sendChatMessage', message)

	// Extend the `addMessageToChat` function to know if the message
	// was sent by us, and then add `.own-message` class to the
	// LI-element before appending it to `messagesEl`
	addMessageToChat(message, true)

	console.log("Emitted 'sendChatMessage' event to server", message)

	// Clear the input field and focus
	messageEl.value = ''
	messageEl.focus()
})

// Get username from form and then show chat
usernameFormEl.addEventListener('submit', e => {
	e.preventDefault()

	// Get username
	username = (usernameFormEl.querySelector('#username') as HTMLInputElement).value.trim()

	// If no username, NO CHAT FOR YOU
	if (!username) {
		return
	}

	// Show chat view
	showChatView()
})
