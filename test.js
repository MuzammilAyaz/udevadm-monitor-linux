const events = require('events');
const { initializeUdevMonitor } = require("./index")
const eventEmitter = new events.EventEmitter();

eventEmitter.on('data', (data) => {
    console.log('started', data);
});


initializeUdevMonitor({ eventEmitter }).then((result) => {
    console.log("Result")
}).catch((err) => {
    console.log("It ended", err)

})