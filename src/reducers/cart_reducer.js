import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload;
      const tempItem = state.cart.find((item) => item.id === id + color);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount =
              cartItem.amount + amount > cartItem.max
                ? cartItem.max
                : cartItem.amount + amount;
            return { ...cartItem, amount: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }
    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce(
        (total, item) => {
          const { price, amount } = item;
          total.total_items += amount;
          total.total_amount += price * amount;
          return total;
        },
        { total_items: 0, total_amount: 0 }
      );
      return { ...state, total_amount, total_items };
    }
    case REMOVE_CART_ITEM: {
      const tempCart = state.cart.filter((item) => item.id !== action.payload);
      return { ...state, cart: tempCart };
    }
    case CLEAR_CART: {
      return { ...state, cart: [] };
    }
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      // let tempCart = state.cart;
      // if (value === "inc") {
      //   tempCart.map((item) =>
      //     item.id === id ? { ...item, amount: item.amount + 1 } : item
      //   );
      // }
      // if (value === "dec") {
      //   tempCart.map((item) =>
      //     item.id === id ? { ...item, amount: item.amount - 1 } : item
      //   );
      // }

      let tempCart = state.cart.map((cartItem) => {
        if (id === cartItem.id) {
          if (value === "inc") {
            let newAmount = cartItem.amount + 1;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            return { ...cartItem, amount: newAmount };
          }
          if (value === "dec") {
            let newAmount = cartItem.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...cartItem, amount: newAmount };
          }
          return cartItem;
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
