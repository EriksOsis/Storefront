import React, {useContext} from "react";
import {CartContext} from "../../../store/Cart_context";
import {BagItem} from "./BagItem";
import classes from "./Bag.module.css";

export function Bag(props) {
    const cartContext = useContext(CartContext);

    const totalAmount = cartContext.totalAmount.toFixed(2);
    const tax = (totalAmount * 0.21).toFixed(2);

    function cartItemAddHandler(item) {
        cartContext.addItem({...item, amount: 1});
    }

    function cartItemRemoveHandler(id) {
        cartContext.removeItem(id);
    }

    const numOfCartItems = cartContext.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);

    return (
        <div className={classes['bag-page']}>
            <h1 className={classes.header}>CART</h1>
            <hr/>
            {cartContext.items.map((item) =>
                <BagItem
                    key={item.id}
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
            <div className={classes.numbers}>
                <p>Tax 21%: </p><span>{props.currencyId + tax}</span>
                <p>Quantity: </p><span>{numOfCartItems}</span>
                <p>Total: </p><span>{props.currencyId + totalAmount}</span>
            </div>
            <button className={classes.order}>ORDER</button>
        </div>
    )
}