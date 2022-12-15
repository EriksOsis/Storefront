import {Query} from "@apollo/client/react/components";
import React from "react";
import {ProductPageContent} from "./ProductPageContent";

class ProductPage extends React.Component {
    render() {
        const {params} = this.props.match;
        return (
            <Query query={this.props.query}>
                {({loading, error, data}) => {
                    if (loading) return 'Loading...';
                    if (error) return <pre>{error.message}</pre>;

                    return data.category.products.map(product =>
                            product.id === params.id && (
                                <ProductPageContent
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    brand={product.brand}
                                    gallery={product.gallery}
                                    attributes={product.attributes}
                                    prices={product.prices}
                                    currencyId={this.props.currencyId}
                                    inStock={product.inStock}
                                    description={product.description}
                                />
                            )
                    );
                }}
            </Query>
        );
    }
}

export default ProductPage;
