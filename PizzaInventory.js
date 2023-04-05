const { VERIFY_INVENTORY, REMOVE_PIZZA } = require("./Constants");

const data = [
    {
        ID: 1,
        Count: 10,
    },
    {
        ID: 2,
        Count: 5,
    },
    {
        ID: 3,
        Count: 15,
    },
];

class PizzaInventory {
    constructor(eventEmitter) {
        this.pizzas = data || [];
        this.eventEmitter = eventEmitter;
        this.verifyInventory = this.verifyInventory.bind(this);
        this.removePizza = this.removePizza.bind(this);
        this.eventEmitter.onEvent(VERIFY_INVENTORY, this.verifyInventory);
        this.eventEmitter.onEvent(REMOVE_PIZZA, this.removePizza);
    }

    verifyInventory(pizza, callback) {
        console.log(this.pizzas);
        const pizzaObject = this.pizzas.find((obj) => obj.ID === pizza.ID);
        if (!pizzaObject) {
            callback(
                new Error(`Pizza is not found with ID \'${pizza.ID}\'`),
                null
            );
            return;
        }
        if (pizzaObject.Count <= 0) {
            callback(new Error(`Out of stock ID \'${pizza.ID}\'`), null);
            return;
        }
        callback(null, true);
    }

    removePizza(pizza, callback) {
        // console.log(`Removing pizza`);
        const pizzaObject = this.pizzas.find((obj) => obj.ID === pizza.ID);
        if (!pizzaObject) {
            callback(
                new Error(`Unable to process pizza with ID \'${pizza.ID}\'`),
                null
            );
            return;
        }

        const updatedPizzaObject = {
            ...pizzaObject,
            Count: pizzaObject.Count - 1,
        };

        const newPizzaObjects = this.pizzas.map((piz) => {
            if (piz.ID === pizzaObject.ID) {
                return updatedPizzaObject;
            } else {
                return piz;
            }
        });

        this.pizzas = newPizzaObjects;
        callback(null, true);
    }
}

module.exports.PizzaInventory = PizzaInventory;
