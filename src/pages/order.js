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
  });
  return (
    <>
      <SEO title="order pizza" />
      <OrderStyles>
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
                    <button key={i} type="button">
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
        </fieldset>
      </OrderStyles>
    </>
  );
};

export default OrderPage;
