import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const { imageUrl, name, quantity, price } = cartItem;
    const { addItemToCart, decreaseQuantity, removeItemFromCart } = useContext(CartContext);

    const handleIncreaseQuantity = () => addItemToCart(cartItem);
    const handleDecreaseQuantity = () => decreaseQuantity(cartItem);
    const handleRemoveItemFromCart = () => removeItemFromCart(cartItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <div className="name">{name}</div>
            <div className="quantity">
                <span className="material-symbols-outlined arrow" onClick={handleDecreaseQuantity}>
                    arrow_back_ios</span>
                <span className='value'>{quantity}</span>
                <span className="material-symbols-outlined arrow" onClick={handleIncreaseQuantity}>
                    arrow_forward_ios
                </span></div>
            <div className="price">{price}</div>
            <div className="remove-button"><span className="material-symbols-outlined" onClick={handleRemoveItemFromCart}>
                close
            </span></div>
        </div>
    )
}

export default CheckoutItem;