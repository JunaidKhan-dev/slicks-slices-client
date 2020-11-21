import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const Paginationstyles = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: start;
  border: 1px solid var(--grey);
  margin: 2rem 0;
  border-radius: 5px;
  text-align: center;
  & > * {
    padding: 1rem;
    flex: 1;
    border-right: 1px solid var(--grey);
    &[aria-current],
    &.current {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

const Pagination = ({ currentPage, pageSize, totalCount, skip, base }) => {
  const totalPage = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= totalPage - 1;
  const hasPrevPage = prevPage >= 1;
  return (
    <Paginationstyles key={currentPage + Math.random()}>
      <Link disabled={!hasPrevPage} to={`/${base}/${prevPage}`}>
        ◀️ prev
      </Link>
      {Array.from({ length: totalPage - 1 }).map((_, i) => (
        <Link
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`/${base}/${i > 0 ? i + 1 : ''}`}
          key={i}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`/${base}/${nextPage}`}>
        ▶️ next
      </Link>
    </Paginationstyles>
  );
};
export default Pagination;
