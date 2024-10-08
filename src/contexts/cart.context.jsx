import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
}


const setCartItemsOnQtyDecrease = (cartItems, item) => {
    if (item.quantity > 1) {
        return cartItems.map((cartItem) => cartItem.id === item.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
    } else {
        return cartItems;
    }
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    cartCount: 0,
    cartTotal: 0,
    decreaseQuantity: () => { },
    removeItemFromCart: () => { },

})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

        setCartCount(newCartCount);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const decreaseQuantity = (item) => {
        setCartItems(setCartItemsOnQtyDecrease(cartItems, item));
    }

    const removeItemFromCart = (item) => {
        setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, cartTotal, decreaseQuantity, removeItemFromCart }
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>

}