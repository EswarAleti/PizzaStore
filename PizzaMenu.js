const { GET_PIZZA_BY_NAME } = require("./Constants");

const pizzaMenu = [
    {
        ID: 1,
        Name: "Cheese Pizza",
        Price: 100,
    },
    {
        ID: 2,
        Name: "Chicken Pizza",
        Price: 150,
    },
    {
        ID: 3,
        Name: "Veg Pizza",
        Price: 80,
    },
];

class PizzaMenu {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.eventEmitter.onEvent(GET_PIZZA_BY_NAME, this.getPizzaByName);
    }

    getPizzaByName(pizzaName, callback) {
        const pizzaObject = pizzaMenu.find((obj) => obj.Name === pizzaName);
        if (!pizzaObject) {
            callback(
                new Error(`Pizza is not found with name \'${pizzaName}\'`),
                null
            );
        } else {
            callback(null, pizzaObject);
        }
    }
}

module.exports.PizzaMenu = PizzaMenu;
