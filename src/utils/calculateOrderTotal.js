import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

const calculateOrderTotal = (order, pizzas) => {
  // loop over each item in the order and calculate total
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );

    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return total;
};

export default calculateOrderTotal;
