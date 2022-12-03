import {useQuery} from "@apollo/client";
import React from "react";
import {useParams} from "react-router-dom";
import {ProductPageContent} from "./ProductPageContent";

export function ProductPage(props) {
    const {data, loading, error} = useQuery(props.query);

    const params = useParams();

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    return (
        data.category.products.map((product) => (product.id === params.id &&
            <ProductPageContent
                key={product.id}
                id={product.id}
                name={product.name}
                brand={product.brand}
                gallery={product.gallery}
                attributes={product.attributes}
                prices={product.prices}
                currencyId={props.currencyId}
                inStock={product.inStock}
                description={product.description}
            />
        ))
    )
}