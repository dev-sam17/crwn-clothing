import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, decreaseQuantity, removeItemFromCart } from '../../store/cart/cart.action';

import './checkout-item.styles.scss';
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const { imageUrl, name, quantity, price } = cartItem;
    const cartItems = useSelector(selectCartItems);

    const handleIncreaseQuantity = () => dispatch(addItemToCart(cartItems, cartItem));
    const handleDecreaseQuantity = () => dispatch(decreaseQuantity(cartItems, cartItem));
    const handleRemoveItemFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));

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