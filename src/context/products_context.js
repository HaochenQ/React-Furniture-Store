import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import Client from "../utils/contentful";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product: {},
  single_product_loding: false,
  single_product_error: false,
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchProducts();
  }, []);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const formateProductsData = (items) => {
    let products = items.map((item) => {
      let tempProduct = item.fields;
      tempProduct.id = item.sys.id;
      tempProduct.image = item.fields.images[0].fields.file.url;
      return tempProduct;
    });
    return products;
  };

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      // get content from contentful
      const response = await Client.getEntries({
        content_type: "cozySpaceProducts",
        order: "fields.price",
      });
      const products = formateProductsData(response.items);

      // get content from course api
      // const response = await axios.get(url);
      // const products = response.data;

      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };
  const formateSingleProductsData = (entry, url) => {
    let tempProduct = entry.fields;
    let tempImages = entry.fields.images.map((image) => image.fields.file);
    tempProduct.images = tempImages;
    tempProduct.id = url;
    return tempProduct;
  };

  const fetchSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const entry = await await Client.getEntry(url);
      const product = formateSingleProductsData(entry, url);
      // course api
      // const response = await axios.get(url);
      // const product = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
