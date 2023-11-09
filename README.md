1. This package can be used to monitor usb events
2. It makes use of spawn
3. initializeUdevMonitor is a function which takes json as an argument
4. the input json default values are {udev = true, kernal = false, property = true, sub_system = false, tag = false, eventEmitter}
5. eventEmitter is a mandatory field.
6. eventEmitter can be created by adding this following lines
    const events = require('events');
    const eventEmitter = new events.EventEmitter();
    eventEmitter.on('data', (data) => {
        //write code on how to handle this data
    });
7. Usb event data will be printed in this event emitter.