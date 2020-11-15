import { useState, useContext } from 'react';
import { OrderContext } from '../components/OrderContext';

const usePizza = ({ pizzas, inputs }) => {
  // use global state via useContext
  const [order, setOrder] = useContext(OrderContext);
  // make a function to add things to order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  // make function to remove from the order
  const removeFromOrder = (index) => {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  };
  // TODO:send this data to serverless when they checkout

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
};

export default usePizza;
