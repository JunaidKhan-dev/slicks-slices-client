import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      id
      name
      slug {
        current
      }
      price
      toppings {
        name
        id
        vegetarian
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
const Pizza = ({ data: { pizza } }) => (
  <>
    {/* ? is provided by Gastby to check the value if exists then look for next chain value and avoid the site to break */}
    <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
    <PizzaGrid>
      <Image fluid={pizza.image.asset.fluid} />
      <div>
        <h2 className="mark">{pizza.name}</h2>
        <ul>
          {pizza.toppings.map((top) => (
            <li key={top.id}>{top.name}</li>
          ))}
        </ul>
      </div>
    </PizzaGrid>
  </>
);

export default Pizza;
