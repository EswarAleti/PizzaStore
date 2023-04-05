const { OrderManagement } = require("./OrderManagement");
const { PizzaInventory } = require("./PizzaInventory");
const { PizzaMenu } = require("./PizzaMenu");
const { PizzaStoreEventEmitter } = require("./PizzaStoreEventEmitter");

const eventEmitter = new PizzaStoreEventEmitter();

const pizzaMenu = new PizzaMenu(eventEmitter);
const pizzaInventory = new PizzaInventory(eventEmitter);
const orderManagement = new OrderManagement(eventEmitter);

const main = async () => {
    for (let i = 0; i < 11; i++) {
        await orderManagement.order("Eswar", "Cheese Pizza");
    }
};

main();
// orderManagement.order("Eswar", "Cheese Pizza");
// orderManagement.order("Eswar", "Cheese Pizza");
// orderManagement.order("Eswar", "Cheese Pizza");
// orderManagement.order("Eswar", "Cheese Pizza");
// orderManagement.order("Eswar", "Cheese Pizza");
