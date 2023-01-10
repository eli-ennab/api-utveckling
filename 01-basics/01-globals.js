/*
* Globals
* node 01-globals
* avbryt i Node med ctrl+c
*/

console.log('Hello, world!')

/*
setTimeout(() => {
	console.log(`I'll be back!`)
}, 3000)
*/

// Will continue running until cancelled ( ctrl + c )
setInterval(() => {
	console.log('Hello')
}, 2000)

console.log('Hello again, world!')
