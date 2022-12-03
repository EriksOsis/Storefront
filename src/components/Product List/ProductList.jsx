import React from 'react';
import {useQuery} from "@apollo/client";
import classes from "./Product.module.css";
import {useParams} from "react-router-dom";
import {ProductItem} from "./ProductItem";

const ProductList = React.forwardRef((props, ref) => {
    const {data, loading, error} = useQuery(props.query);
    const params = useParams();

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    const productItem =
        data.category.products.map((product) => (
            params.category === product.category ?
                <ProductItem
                    key={product.id}
                    id={product.id}
                    inStock={product.inStock}
                    gallery={product.gallery}
                    name={product.name}
                    brand={product.brand}
                    prices={product.prices}
                    attributes={product.attributes}
                    category={product.category}
                    currencyId={props.currencyId}
                />
                : params.category === 'all' &&
                <ProductItem
                    key={product.id}
                    id={product.id}
                    inStock={product.inStock}
                    gallery={product.gallery}
                    name={product.name}
                    brand={product.brand}
                    prices={product.prices}
                    attributes={product.attributes}
                    category={product.category}
                    currencyId={props.currencyId}
                />
        ));

    return (
        <div>
            <h1 className={classes['category-name']}>{params.category.toUpperCase()}</h1>
            <div className={classes['prod-list']}>
                {productItem}
            </div>
        </div>
    );
})

export default ProductList;