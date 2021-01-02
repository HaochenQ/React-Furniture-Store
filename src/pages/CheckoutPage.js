import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import {
  FaUser,
  FaAddressCard,
  FaEnvelope,
  FaCreditCard,
  FaCity,
} from "react-icons/fa";

const CheckoutPage = () => {
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page-100 section section-center">
        <form
          className="container"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Your Order Placed Successfully!");
          }}
        >
          <div className="info address">
            <h3>Billing Address</h3>
            <label className="label">
              <FaUser />
              <span> Full Name:</span>
            </label>
            <input type="text" name="first-name" placeholder="John Doe" />
            <label className="label">
              <FaEnvelope /> Email:
            </label>
            <input type="text" name="email" placeholder="john@example.com" />
            <label className="label">
              <FaAddressCard /> Address:
            </label>
            <input
              type="text"
              name="address"
              placeholder="425/29 Collins st Melbourne"
            />
            <label className="label">
              <FaCity /> City:
            </label>
            <input type="text" name="city" placeholder="Melbourne" />
            <label className="label">Zip:</label>
            <input type="text" name="zip" placeholder="3000" />
            <label className="label">State:</label>
            <input type="text" name="state" placeholder="VIC" />
            <label>
              <input type="checkbox" name="sameadr" /> Shipping address same as
              billing
            </label>
          </div>
          <div className="info payment">
            <h3>Payment</h3>
            <label className="label">Name on Card:</label>
            <input type="text" name="card-name" placeholder="John Doe" />
            <label className="label">
              <FaCreditCard /> Card Number:
            </label>
            <input
              type="text"
              name="card-number"
              placeholder="1111-2222-3333-4444"
            />
            <label className="label">CVV:</label>
            <input type="text" name="CVV" placeholder="666" />
            <label className="label">Expiration Date:</label>
            <input type="text" name="exp-date" placeholder="07/21" />

            <input
              className="btn place-order"
              type="submit"
              value="Place Order"
            />
          </div>
        </form>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  .container {
    display: flex;
    flex-direction: row;
  }

  /* Responsive layout - makes a one column layout instead of a two-column layout */
  @media (max-width: 800px) {
    .container {
      flex-direction: column;
    }
  }
  .info {
    flex: 50%;
  }

  label {
    margin-bottom: 10px;
    display: block;
  }
  input[type="text"] {
    width: 85%;
    margin-bottom: 20px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display: block;
  }
  .label {
    font-size: 18px;
  }
`;
export default CheckoutPage;
