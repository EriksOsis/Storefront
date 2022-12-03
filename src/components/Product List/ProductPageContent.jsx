import classes from "./ProductPage.module.css";
import React, {useContext, useState} from "react";
import {CartContext} from "../../store/Cart_context";

export function ProductPageContent(props) {
    const [spotlight, IsSpotlight] = useState(false);
    const [source, setSource] = useState('');

    const parse = require('html-react-parser');

    const cartContext = useContext(CartContext);

    function onAddToCartHandler() {
        cartContext.addItem({
            id: props.id,
            name: props.name,
            amount: 1,
            prices: props.prices,
            brand: props.brand,
            attributes: props.attributes,
            gallery: props.gallery
        });
    }

    function gettingSrc(event) {
        IsSpotlight(true);
        setSource(event.target.src);
    }

    return (
        <div className={classes['product-page']}>
            <section className={classes.gallery}>
                {props.gallery.map((picture) =>
                    <div>
                        <img src={picture} onClick={gettingSrc} alt={'product gallery picture'}/>
                    </div>)}
            </section>
            <section className={classes.spotlight}>
                <img src={!spotlight ? props.gallery[0] : source} alt={'product picture'}/>
            </section>
            <section className={classes['product-info']}>
                <h1>{props.brand}</h1>
                <h1 className={classes.title}>{props.name}</h1>
                {props.attributes.map((attribute) => (
                    <div>
                        <h2>{attribute.name.toUpperCase()}:</h2>
                        <div className={classes.attributes}>
                            {
                                attribute.name === 'Color' ?
                                    attribute.items.map((item) => (
                                        <button className={classes['color']}
                                                style={{backgroundColor: item.value}}></button>
                                    )) :
                                    attribute.items.map((item) => (
                                        <button className={classes['size']}>{item.value}</button>
                                    ))
                            }
                        </div>
                    </div>
                ))}
                <h2>PRICE:</h2>
                <p className={classes.price}>{props.prices.map((currency) => (
                    currency.currency.symbol === props.currencyId) && (props.currencyId + currency.amount)
                )}</p>
                {props.inStock &&
                    <button onClick={onAddToCartHandler} className={classes['add-to-cart']}>ADD TO CART</button>}
                <p className={classes.description}>
                    {parse(props.description)}
                </p>
            </section>
        </div>
    )
}