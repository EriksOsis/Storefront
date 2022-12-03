import classes from "./Nav.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {gql, useQuery} from "@apollo/client";

const CATEGORY_QUERY = gql`
{
  categories {
    name
  }
}`;

export const Categories = (props) => {

    const {data, loading, error} = useQuery(CATEGORY_QUERY);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;
    return (
        <div className={classes.categories}>
            {data.categories.map((category) =>
                <li key={category.name} onClick={props.onClose}>
                    <NavLink to={`/products-list/${category.name}`} exact className={classes.category}
                             activeClassName={classes.active}>{category.name.toUpperCase()}</NavLink>
                </li>
            )}
        </div>
    )
}