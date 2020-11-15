import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => (
  <>
    {order.map((or, i) => {
      const pizza = pizzas.find((pizza) => pizza.id === or.id);
      return (
        <MenuItemStyles key={i}>
          <Img fluid={pizza.image.asset.fluid} />
          <h2>{or.id}</h2>
          <p>
            {formatMoney(calculatePizzaPrice(pizza.price, or.size))}
            <button
              type="button"
              className="remove"
              title={`Remove ${or.size} ${pizza.name} from order`}
              onClick={() => removeFromOrder(i)}
            >
              &times;
            </button>
          </p>
        </MenuItemStyles>
      );
    })}
  </>
);

export default PizzaOrder;
