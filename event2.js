//importing the events module
const events = require('events')

const eventEmitter= new events.EventEmitter();

const connectHandler= function connected(){
    console.log('Connection established')
    eventEmitter.emit('data_recieved')
}

//Binds the event with the handler
eventEmitter.on('connection',connectHandler)

//Binds the data recieved
eventEmitter.on('data_recieved', function(){
    console.log('Data transfer Successful')
})

//Trigger the connection event
eventEmitter.emit('connection')
console.log('Finish the task')