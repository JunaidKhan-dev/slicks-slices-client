import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Image from 'gatsby-image';
import SEO from '../components/SEO';

export const { data } = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      slug {
        current
      }
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

const DivWrapper = styled.div`
  text-align: center;
  h1 {
    position: relative;
    top: 15px;
    z-index: 2;
  }
  .gatsby-image-wrapper {
    img {
      object-position: top center !important;
    }
  }
`;
const Slicemaster = ({ data: { person } }) => (
  <>
    <SEO title={person.name} image={person.image.asset.fluid.src} />
    <DivWrapper>
      <h1 className="mark">{person.name} - SliceMaster</h1>

      <Image
        fluid={person.image.asset.fluid}
        style={{ width: '40%', margin: '0 auto' }}
        alt={person.name}
      />
      <p>{person.description}</p>
    </DivWrapper>
  </>
);

export default Slicemaster;
