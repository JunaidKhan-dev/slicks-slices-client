import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 4rem;
  grid-auto-rows: auto auto 300px;
`;

const PizzaStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    grid-template-rows: auto auto 1fr;
  }

  grid-row: span 3;
  grid-gap: 1rem;

  p {
    margin: 10px;
    letter-spacing: 0;
  }
`;

const SinglePizza = ({ pizza }) => (
  <PizzaStyles>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
    </Link>
    <p>{pizza.toppings.map((top) => top.name).join(', ')}</p>

    <Img
      fluid={pizza.image.asset.fluid}
      style={{
        minHeight: '300px',
        maxHeight: '320px',
        height: 'auto',
        marginBottom: '30px',
      }}
      objectFit="contain"
      alt={pizza.name}
    />
  </PizzaStyles>
);
const PizzaList = ({ pizzas }) => (
  <PizzaGridStyles>
    {pizzas &&
      pizzas.map((pizza) => <SinglePizza key={pizza.id} pizza={pizza} />)}
  </PizzaGridStyles>
);

export default PizzaList;
