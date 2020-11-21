import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

const attachNamesAndPrices = (order, pizzas) => {
  const orders = order.map((item) => {
    const pizza = pizzas.find((piz) => piz.id === item.id);

    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatMoney(calculatePizzaPrice(pizza.price, item.size)),
    };
  });

  return orders;
};

export default attachNamesAndPrices;
