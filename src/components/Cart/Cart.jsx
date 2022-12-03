import {Link} from "react-router-dom";
import classes from './Cart.module.css';
import {Modal} from "./Modal";
import React, {useContext} from "react";
import {CartContext} from "../../store/Cart_context";
import {CartItem} from "./CartItem";

export function Cart(props) {

    const cartContext = useContext(CartContext);

    const totalAmount = cartContext.totalAmount.toFixed(2);

    function cartItemAddHandler(item) {
        cartContext.addItem({...item, amount: 1});
    }

    function cartItemRemoveHandler(id) {
        cartContext.removeItem(id);
    }

    return (
        <Modal onClose={props.onClose} className={classes.modal}>
            <div className={classes.cart}>
                <h1 className={classes.top}>
                    My Bag, <span>{props.numOfCartItems} item{props.numOfCartItems === 1 ? '' : 's'}</span></h1>
                {cartContext.items.map((item) =>
                    <CartItem
                        key={item.id}
                        initId={item.initId}
                        id={item.id}
                        name={item.name}
                        brand={item.brand}
                        prices={item.prices}
                        currencyId={props.currencyId}
                        attributes={item.attributes}
                        gallery={item.gallery}
                        amount={item.amount}
                        onAdd={cartItemAddHandler.bind(null, item)}
                        onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    />
                )}
                <div className={classes['cart-total']}>
                    <p>Total</p>
                    <p className={classes.bold}>{props.currencyId}{totalAmount}</p>
                </div>
                <div className={classes.actions}>
                    <Link to={'/bag'} onClick={props.onClose} className={classes['view-bag']}>VIEW BAG</Link>
                    <Link to={'/bag'} className={classes['check-out']}>CHECK OUT</Link>
                </div>
            </div>
        </Modal>
    )
}