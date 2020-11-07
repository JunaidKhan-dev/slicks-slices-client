import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

export const query = graphql`
  query($limit: Int!, $skip: Int) {
    beers: allBeer(limit: $limit, skip: $skip) {
      totalCount
      nodes {
        id
        price
        name
        rating {
          average
          reviews
        }
        image
      }
    }
  }
`;

const BeerGrid = styled.ul`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  list-style: none;
`;

const SingleBeerStyle = styled.li`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: flex;
    align-items: center;
    font-size: 10px;
    color: var(--grey);
  }
`;

const NavWrapper = styled.nav`
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    li {
      padding: 1rem;
      &.disable {
        a {
          color: lightgray !important;
          cursor: default;
          pointer-events: none;
          outline: none;
        }
      }
      &.active {
        a {
          color: red !important;
        }
      }
    }
  }
`;

const baseUrl = '/beers/';

const BeersPage = ({ data: { beers }, pageContext, location }) => (
  <>
    <h2 className="center">
      we have {beers.totalCount} beers Available. Dine in Only!
    </h2>
    <BeerGrid>
      {beers.nodes.map((beer) => {
        const rating = Math.round(beer.rating.average);
        return (
          <SingleBeerStyle key={beer.id}>
            {beer.image && <img src={beer.image} alt={beer.name} />}
            <h3>{beer.name}</h3>
            <h5>{beer.price}</h5>
            <p title={`${rating} out of 5 stars`}>
              {`⭐`.repeat(rating)}
              <span style={{ filter: `grayscale(100%)` }}>
                {`⭐`.repeat(5 - rating)}
              </span>
              <span>({beer.rating.reviews})</span>
            </p>
          </SingleBeerStyle>
        );
      })}
    </BeerGrid>
    <NavWrapper>
      <ul>
        <li className={`${pageContext.currentPage <= 1 ? 'disable' : ''}`}>
          <Link
            to={`${
              pageContext.currentPage === 2
                ? baseUrl
                : baseUrl + (pageContext.currentPage - 1)
            }`}
          >
            Prev
          </Link>
        </li>
        {Array.from({ length: pageContext.totalPages }).map((_, i) => (
          <>
            <li
              id={i}
              className={`${
                pageContext.currentPage === i + 1 ? 'active' : ''
              } `}
            >
              <Link to={i + 1 === 1 ? baseUrl : baseUrl + (i + 1)}>
                {i + 1}
              </Link>
            </li>
          </>
        ))}

        <li
          className={`${
            pageContext.currentPage < pageContext.totalPages ? '' : 'disable'
          }`}
        >
          <Link to={`/beers/${pageContext.currentPage + 1}`}>Next</Link>
        </li>
      </ul>
    </NavWrapper>
  </>
);

export default BeersPage;
