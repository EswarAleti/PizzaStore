const {
    VERIFY_INVENTORY,
    GET_PIZZA_BY_NAME,
    REMOVE_PIZZA,
} = require("./Constants");

class OrderManagement {
    constructor(eventEmitter) {
        this.orderNumber = 0;
        this.eventEmitter = eventEmitter;
    }

    async order(customerName, pizzaName) {
        try {
            const pizzaObject = await this.eventEmitter.emitEvent(
                GET_PIZZA_BY_NAME,
                pizzaName
            );
            let result = await this.eventEmitter.emitEvent(
                VERIFY_INVENTORY,
                pizzaObject
            );
            console.log(
                `Order has been placed successfully, and your orderNumber is ${this.orderNumber}`
            );
            result = await this.eventEmitter.emitEvent(
                REMOVE_PIZZA,
                pizzaObject
            );
            console.log(
                `Order has been served successfully with orderNumber ${this.orderNumber}`
            );
            this.orderNumber++;
        } catch (e) {
            console.log(e);
            console.log("Order cannot be placed!", e.message);
        }
    }
}

module.exports.OrderManagement = OrderManagement;
