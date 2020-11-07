import React from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    slicemasters: allSanityPerson(skip: $skip, limit: $pageSize) {
      totalCount
      nodes {
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
  }
`;

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(2, minmax(250px, 1fr));
  text-align: center;
`;

const Slicemasterstyle = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
  }
`;
const SlicemastersPage = ({ data: { slicemasters }, pageContext }) => {
  const sliceMasters = slicemasters.nodes;
  return (
    <>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={slicemasters.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="slicemasters"
      />
      <SlicemasterGrid>
        {sliceMasters.map((slicemaster) => (
          <>
            {slicemaster.image.asset && (
              <Slicemasterstyle key={slicemaster.id}>
                <Link to={`/slicemaster/${slicemaster.slug.current}`}>
                  <h2>
                    <span className="mark">{slicemaster.name}</span>
                  </h2>
                </Link>

                <Image fluid={slicemaster.image.asset.fluid} />

                <p className="description">{slicemaster.description}</p>
              </Slicemasterstyle>
            )}
          </>
        ))}
      </SlicemasterGrid>
    </>
  );
};

export default SlicemastersPage;
