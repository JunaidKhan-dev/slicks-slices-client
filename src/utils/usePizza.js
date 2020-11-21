import { useState, useContext } from 'react';
import { OrderContext } from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

const usePizza = ({ pizzas, values }) => {
  // use global state via useContext
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // make a function to add things to order
  const addToOrder = (orderedPizza) => {
    setOrder([...order, orderedPizza]);
  };
  // make function to remove from the order
  const removeFromOrder = (index) => {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  };

  // runs when someone submit the form
  const submitOrder = async (e) => {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    setError(null);
    setMessage(null);

    // gather all Data to send to function for order
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      maplesyrup: values.maplesyrup,
    };

    // TODO:send this data to serverless when they checkout
    const response = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await response.text());

    // check if everything worked
    if (response.status >= 400 && response.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success! come on down for your pizza');
    }
  };

  return {
    order: attachNamesAndPrices(order, pizzas),
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
};

export default usePizza;
