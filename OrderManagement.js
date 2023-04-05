const {
    VERIFY_INVENTORY,
    GET_PIZZA_BY_NAME,
    REMOVE_PIZZA,
    ADD_ORDER,
} = require("./Constants");

class OrderManagement {
    constructor(eventEmitter) {
        this.orderID = 0;
        this.orders = [];
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
            const order = {
                "customer name": customerName,
                "order ID": this.orderID,
                "pizza ID": pizzaObject.ID,
                "pizza name": pizzaObject.Name,
            };
            this.addOrder(order);
            console.log(
                `Order has been placed successfully, and your orderID is ${this.orderID}`
            );
            result = await this.eventEmitter.emitEvent(
                REMOVE_PIZZA,
                pizzaObject
            );
            console.log(
                `Order has been served successfully with orderID ${this.orderID}`
            );
            this.orderID++;
        } catch (e) {
            console.log("Order cannot be placed!", e.message);
        }
    }

    addOrder(order) {
        this.orders.push(order);
    }
}

module.exports.OrderManagement = OrderManagement;
