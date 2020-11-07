import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 1 1rem;
    padding: 5px;
    background: var(--grey);
    align-items: center;
    border-radius: 4px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;
const query = graphql`
  query {
    allPizzas: allSanityPizza {
      nodes {
        toppings {
          name
          id
        }
      }
    }
  }
`;

const countPizzasInToppings = (pizzas) => {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // finding if topping exists
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }

      return acc;
    }, {});

  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
};
const ToppingFilter = ({ activeTopping }) => {
  const {
    allPizzas: { nodes: pizzas },
  } = useStaticQuery(query);

  const toppingWithCounts = countPizzasInToppings(pizzas);
  return (
    <ToppingsStyles>
      {toppingWithCounts.map((topping) => (
        <Link key={topping.id} to={`/topping/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
};

export default ToppingFilter;
