import './assets/scss/style.scss'
import { io, Socket } from 'socket.io-client'

const SOCKET_HOST = import.meta.env.VITE_APP_SOCKET_HOST

const messageEl = document.querySelector('#message') as HTMLInputElement
const messageFormEl = document.querySelector('#message-form') as HTMLFormElement
const messagesEl = document.querySelector('#messages') as HTMLDivElement

// Connect to Socket.IO server
const socket = io(SOCKET_HOST)

// Listen for when connection is established
socket.on('connect', () => {
	console.log('Connected to the server with ID:', socket.id)
})

// Listen for when the server disconnected
socket.on('disconnect', () => {
	console.log('Disconnected from the server')
})
