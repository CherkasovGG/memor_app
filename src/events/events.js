// events.js
export const EventEmitter = {
    events: {},
    subscribe(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        
        this.events[event].push(callback);
    },
    emit(event, data) {
        console.log(event);
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
};