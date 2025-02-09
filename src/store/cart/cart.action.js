import { CART_ACTION_TYPES } from "./cart.type";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)

const addCartItem = (cartItems, productToAdd) => {
    console.log("cartItem:", typeof cartItems, " + ", cartItems)
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const setCartItemsOnQtyDecrease = (cartItems, item) => {
    if (item.quantity > 1) {
        return cartItems.map((cartItem) =>
            cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    } else {
        return cartItems;
    }
};

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
};

export const decreaseQuantity = (cartItems, item) => {
    const newCartItems = setCartItemsOnQtyDecrease(cartItems, item);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
};

export const removeItemFromCart = (cartItems, item) => {
    const newCartItems = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
    );

    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
};