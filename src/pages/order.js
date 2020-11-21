/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import calculateOrderTotal from '../utils/calculateOrderTotal';
import PizzaOrder from '../components/PizzaOrder';

export const query = graphql`
  {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
const OrderPage = ({ data: { pizzas } }) => {
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    maplesyrup: '',
  });

  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = usePizza({
    pizzas: pizzas.nodes,
    values,
  });
  if (message) {
    return <p>{message}</p>;
  }
  return (
    <>
      <SEO title="order pizza" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset>
          <legend>Your Info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={values.email}
            onChange={updateValue}
          />
          {/* honey pot to avoid bots */}
          <input
            type="maplesyrup"
            name="maplesyrup"
            id="maplesyrup"
            value={values.maplesyrup}
            onChange={updateValue}
            className="maplesyrup"
          />
        </fieldset>

        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas &&
            pizzas.nodes.map((pizza) => (
              <MenuStyles key={pizza.id}>
                <Img
                  height="50"
                  width="50"
                  fluid={pizza.image.asset.fluid}
                  alt={pizza.name}
                />
                <div>
                  <h2>{pizza.name}</h2>
                </div>
                <div>
                  {['S', 'M', 'L'].map((size, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => addToOrder({ id: pizza.id, size })}
                    >
                      {size} {''}
                      {formatMoney(calculatePizzaPrice(pizza.price, size))}
                    </button>
                  ))}
                </div>
              </MenuStyles>
            ))}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas.nodes}
          />
        </fieldset>
        <fieldset>
          <h3>
            Your Total is{' '}
            {formatMoney(calculateOrderTotal(order, pizzas.nodes))}
          </h3>
          <div>{error && <p>Error: {error}</p>}</div>

          <button type="submit" disabled={loading}>
            {loading ? 'placing order' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
};

export default OrderPage;
