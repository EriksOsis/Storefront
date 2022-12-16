import React from "react";
import {CartContext} from "../../../store/Cart_context";
import {BagItem} from "./BagItem";
import classes from "./Bag.module.css";

export class Bag extends React.Component {
    static contextType = CartContext;

    constructor(props) {
        super(props);
        this.cartItemAddHandler = this.cartItemAddHandler.bind(this);
        this.cartItemRemoveHandler = this.cartItemRemoveHandler.bind(this);
    }

    cartItemAddHandler(item) {
        this.context.addItem({...item, amount: 1});
    }

    cartItemRemoveHandler(id) {
        this.context.removeItem(id);
    }

    render() {
        const totalAmount = this.context.totalAmount.toFixed(2);
        const tax = (totalAmount * 0.21).toFixed(2);
        const numOfCartItems = this.context.items.reduce((curNumber, item) => {
            return curNumber + item.amount;
        }, 0);

        return (
            <div className={classes['bag-page']}>
                <h1 className={classes.header}>CART</h1>
                <hr/>
                {this.context.items.map((item) =>
                    <BagItem
                        key={item.id}
                        initId={item.initId}
                        id={item.id}
                        name={item.name}
                        brand={item.brand}
                        prices={item.prices}
                        currencyId={this.props.currencyId}
                        attributes={item.attributes}
                        gallery={item.gallery}
                        amount={item.amount}
                        onAdd={this.cartItemAddHandler.bind(null, item)}
                        onRemove={this.cartItemRemoveHandler.bind(null, item.id)}
                    />
                )}
                <div className={classes.numbers}>
                    <p>Tax 21%: </p><span>{"$" + tax}</span>
                    <p>Quantity: </p><span>{numOfCartItems}</span>
                    <p>Total: </p><span>{'$' + totalAmount}</span>
                </div>
                <button className={classes.order}>ORDER</button>
            </div>
        )
    }
}