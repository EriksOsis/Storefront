import {Link} from "react-router-dom";
import classes from './Cart.module.css';
import {Modal} from "./Modal";
import React from "react";
import {CartContext} from "../../store/Cart_context";
import {CartItem} from "./CartItem";

export class Cart extends React.Component {
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

        return (
            <Modal onClose={this.props.onClose} className={classes.modal}>
                <div className={classes.cart}>
                    <h1 className={classes.top}>
                        My Bag, <span>{this.props.numOfCartItems} item{this.props.numOfCartItems === 1 ? '' : 's'}</span>
                    </h1>
                    {this.context.items.map((item) =>
                        <CartItem
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
                    <div className={classes['cart-total']}>
                        <p>Total</p>
                        <p className={classes.bold}>{this.props.currencyId}{totalAmount}</p>
                    </div>
                    <div className={classes.actions}>
                        <Link to={'/bag'} onClick={this.props.onClose} className={classes['view-bag']}>VIEW BAG</Link>
                        <Link to={'/bag'} className={classes['check-out']}>CHECK OUT</Link>
                    </div>
                </div>
            </Modal>
        );
    }
}