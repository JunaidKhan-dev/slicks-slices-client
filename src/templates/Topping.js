import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';

export const query = graphql`
  query($toppingName: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingName } } } }
    ) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 750) {
              ...GatsbySanityImageFluid
            }
          }
        }
        toppings {
          name
          vegetarian
          id
        }
      }
    }
  }
`;
const Topping = ({ data, pageContext }) => (
  <div>
    <h2 className="mark">{pageContext.toppingName}</h2>
    <div style={{ marginTop: '2rem' }}>
      <PizzaList pizzas={data.pizzas.nodes} />
    </div>
  </div>
);

export default Topping;
