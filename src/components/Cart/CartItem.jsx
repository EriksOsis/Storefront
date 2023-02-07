import classes from "./Cart.module.css";
import React from 'react';

export class CartItem extends React.Component {
    render() {
        const selectedAttributes = this.props.id.substr(this.props.initId.length + 1).split('&');

        return (
            <div className={classes['cart-item']}>
                <div className={classes['item-info']}>
                    <p className={classes['item-title']}>
                        {this.props.brand}
                        <br/>
                        {this.props.name}
                    </p>
                    <p className={classes['item-price']}>
                        {this.props.prices.map((currency) =>
                            currency.currency.symbol === this.props.currencyId &&
                            (this.props.currencyId + currency.amount)
                        )}
                    </p>
                    {this.props.attributes.map((attribute) => (
                        <div key={attribute.name}>
                            <p className={classes['attribute-title']}>{attribute.name}:</p>
                            <div className={classes.attributes}>
                                {
                                    attribute.name === 'Color' ?
                                        attribute.items.map((item) => (
                                            <button
                                                key={item.value}
                                                className={
                                                    selectedAttributes
                                                        .map((attribute) => attribute)
                                                        .find((attribute) => attribute === item.value) === item.value
                                                        ? [classes['color'], classes['color-selected']].join(' ')
                                                        : classes.color
                                                }
                                                style={{backgroundColor: item.value}}
                                            ></button>
                                        )) :
                                        attribute.items.map((item) => (
                                            <button
                                                key={item.value}
                                                className={
                                                    selectedAttributes
                                                        .map((attribute) => attribute)
                                                        .find((attribute) => attribute === item.value) === item.value
                                                        ? [classes['cart-btn'], classes['selected']].join(' ')
                                                        : classes['cart-btn']
                                                }
                                            >
                                                {item.value}
                                            </button>
                                        ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <div className={classes.amount}>
                    <button
                        onClick={this.props.onAdd}
                        className={[classes['cart-btn'], classes['amount-btn']].join(' ')}
                    >
                        +
                    </button>
                    <p>{this.props.amount}</p>
                    <button
                        onClick={this.props.onRemove}
                        className={[classes['cart-btn'], classes['amount-btn']].join(' ')}
                    >
                        −
                    </button>
                </div>
                <div className={classes['cart-img']}>
                    <img
                        src={this.props.gallery[0]}
                        alt={`${this.props.name} in shopping cart`}
                    />
                </div>
            </div>
        )
    }
}