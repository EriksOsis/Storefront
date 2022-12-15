import React from 'react';
import classes from "./Product.module.css";
import {ProductItem} from "./ProductItem";
import {Query} from "@apollo/client/react/components";

class ProductList extends React.Component {
    render() {
        const {params} = this.props.match;
        return (
            <Query query={this.props.query}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return <pre>{error.message}</pre>;

                    return <div>
                        <h1 className={classes['category-name']}>{params.category.toUpperCase()}</h1>
                        <div className={classes['prod-list']}>
                            {data.category.products.map((product) => (
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
                                        currencyId={this.props.currencyId}
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
                                        currencyId={this.props.currencyId}
                                    />
                            ))}
                        </div>
                    </div>
                }}
            </Query>
        )

    }
}

export default ProductList;