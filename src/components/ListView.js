import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";
import { items_per_page } from "../utils/constants";
import Pagenation from "./Pagenation";
import paginate from "../utils/paginate";

const ListView = ({ products }) => {
  const items_per_page = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLastPage = () => {
    setCurrentPage(currentPage - 1);

    return;
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  let temProducts = paginate(products, items_per_page)[currentPage - 1];
  return (
    <Wrapper>
      {temProducts &&
        temProducts.map((product) => {
          const { id, name, image, price, description } = product;
          return (
            <article key={id}>
              <img src={image} alt={name} />
              <div>
                <h4>{name}</h4>
                <h5 className="price">{formatPrice(price)}</h5>
                <p className="desc">{description.substring(0, 150)}...</p>
                <Link className="btn" to={`/products/${id}`}>
                  Details
                </Link>
              </div>
            </article>
          );
        })}

      <Pagenation
        ItemCount={products.length}
        pageSize={items_per_page}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        onLastPage={handleLastPage}
        onNextPage={handleNextPage}
      ></Pagenation>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;

  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`;

export default ListView;
