const { spawn } = require("child_process");
const events = require('events');

/**
 * 
 * @param {*} param0 
 * @returns 
 */

const initializeUdevMonitor = ({ udev = true, kernal = false, property = true, sub_system = false, tag = false, eventEmitter } = {}) => {
    return new Promise((resolve, reject) => {
        try {
            if (!eventEmitter || typeof eventEmitter !== "object" || !eventEmitter instanceof events.EventEmitter) {
                return reject("Event emitter not found")
            }
            const udevMonitorCmd = "udevadm";
            const udevMonitorArgs = ["monitor"];
            if (udev) {
                udevMonitorArgs.push("--udev");
            }
            if (kernal) {
                udevMonitorArgs.push("--kernal");
            }
            if (property) {
                udevMonitorArgs.push("--property");
            }
            if (sub_system) {
                const subSystems = "--subsystem" + sub_system;
                udevMonitorArgs.push(subSystems);
            }
            if (tag) {
                const tags = "--tag-match" + tag;
                udevMonitorArgs.push(tags);
            }

            const udevadmMonitor = spawn(udevMonitorCmd, udevMonitorArgs);

            udevadmMonitor.stdout.on('data', (data) => {
                console.log("Data");
                console.log(data.toString());
                eventEmitter.emit("data", organizeMessage(data.toString()))
            });

            udevadmMonitor.on('error', (error) => {
                console.error('Error:', error);
                reject("Error in initializeUdevMonitor - devadm-monitor-linux:" + error?.stack && error?.stack)
            });

            udevadmMonitor.on('close', (code) => {
                console.log('Child process exited with code', code);
            });
        } catch (err) {
            console.log("Error in initializeUdevMonitor:", err);
            return reject(err);
        }
    })
}

const organizeMessage = (data) => {
    return data;
}

module.exports = { initializeUdevMonitor }