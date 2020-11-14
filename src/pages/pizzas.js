import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingFilter from '../components/ToppingFilter';

const PizzasPage = ({ data, pageContext }) => {
  const { nodes: pizzas } = data.pizzas;

  return (
    <>
      <SEO
        title={
          pageContext.toppingName
            ? `Pizzas With ${pageContext.toppingName.replace('/', '')}`
            : 'all pizzas'
        }
      />
      <ToppingFilter activeTopping={pageContext.toppingName} />
      <PizzaList pizzas={pizzas} />
    </>
  );
};

export const pageQuery = graphql`
  query($toppingName: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { regex: $toppingName } } } }
    ) {
      nodes {
        id
        slug {
          current
        }
        name
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 750) {
              aspectRatio
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
export default PizzasPage;
// GatsbySanityImageFluid
