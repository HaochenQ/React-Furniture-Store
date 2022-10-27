import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import heroBcg from "../assets/hero-bcg-4.jpg";
import heroBcg2 from "../assets/hero-bcg-6.jpg";

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <article className="content text">
        <h1>
          Create your
          <br /> dream home
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          eligendi soluta aut repudiandae quia tempora nobis alias ut suscipit
          officia.
        </p>
        <Link className="btn hero-btn" to="/products">
          Shop Now
        </Link>
      </article>
      <article className="img-container">
        <img className="main-img" src={heroBcg} alt="table" />
        <img className="accent-img" src={heroBcg2} alt="worker" />
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 60vh;
  /* min-width: 100%;
  background-color: tomato; */
  display: grid;
  place-items: center;

  .img-container {
    display: none;
  }
  .text {
    animation-name: desc;
    animation-duration: 1s;
  }
  @keyframes desc {
    from {
      transform: translateY(-8rem);
    }
    to {
      transform: translateY(0);
    }
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
      animation-name: main-img;
      animation-duration: 1s;
    }
    @keyframes main-img {
      from {
        transform: translateX(8rem);
      }
      to {
        transform: translateX(0);
      }
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 300px;
      transform: translateX(-50%);
      border-radius: var(--radius);
      animation-name: accent-img;
      animation-duration: 1s;
    }
    @keyframes accent-img {
      from {
        transform: translateY(8rem);
      }
      to {
        transform: translatY(0);
      }
    }
    .img-container::before {
      content: "";
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
      animation-name: main-img;
      animation-duration: 1s;
    }
  }
`;

export default Hero;
