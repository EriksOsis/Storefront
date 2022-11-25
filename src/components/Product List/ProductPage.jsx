import classes from './ProductPage.module.css';
import {useQuery} from "@apollo/client";
import React, {useState} from "react";
import {useParams} from "react-router-dom";

export function ProductPage(props) {
    const {data, loading, error} = useQuery(props.query);
    const params = useParams();
    const [spotlight, IsSpotlight] = useState(false);
    const [source, setSource] = useState('');

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    const parse = require('html-react-parser');


    function gettingSrc(event) {
        IsSpotlight(true);
        setSource(event.target.src);
    }

    return (
        data.category.products.map((product) => (product.id === params.id &&
            <div className={classes['product-page']}>
                <section className={classes.gallery}>
                    {product.gallery.map((picture) => <div>
                        <img src={picture} onClick={gettingSrc} alt={'product gallery picture'}/>
                    </div>)}
                </section>
                <section className={classes.spotlight}>
                    <img src={!spotlight ? product.gallery[0] : source} alt={'product picture'}/>
                </section>
                <section className={classes['product-info']}>
                    <h1>{product.brand}</h1>
                    <h1 className={classes.title}>{product.name}</h1>
                    {product.attributes.map((attribute) => (
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
                    <p className={classes.price}>{product.prices.map((currency) => (
                        currency.currency.symbol === props.currencyId) && (props.currencyId + currency.amount)
                    )}</p>
                    {product.inStock && <button className={classes['add-to-cart']}>ADD TO CART</button>}
                    <p className={classes.description}>
                        {parse(product.description)}
                    </p>
                </section>
            </div>
        ))
    )
}