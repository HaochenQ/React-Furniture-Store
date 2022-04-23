import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import { items_per_page } from "../utils/constants";
import Pagenation from "./Pagenation";
import paginate from "../utils/paginate";

const GridView = ({ products }) => {
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
      <div className="products-container">
        {temProducts &&
          temProducts.map((product) => {
            return <Product key={product.id} {...product} />;
          })}
      </div>
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
  img {
    height: 175px;
  }

  .products-container {
    display: grid;
    gap: 2rem 1.5rem;
  }

  @media (min-width: 992px) {
    .products-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (min-width: 1170px) {
    .products-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

export default GridView;
