const { EventEmitter } = require("node:events");
class PizzaStoreEventEmitter extends EventEmitter {
    async emitEvent(eventName, ...params) {
        const result = await new Promise((resolve, reject) => {
            this.emit(eventName, ...params, function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        return result;
    }

    async onEvent(eventName, callback = () => {}) {
        this.on(eventName, callback);
    }
}

module.exports.PizzaStoreEventEmitter = PizzaStoreEventEmitter;
