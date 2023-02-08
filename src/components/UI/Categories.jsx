import classes from "./Nav.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {Query} from "@apollo/client/react/components";
import {CATEGORY_QUERY} from "../../Queries/queries";

export class Categories extends React.Component {
    render() {
        return <Query query={CATEGORY_QUERY}>
            {({loading, error, data}) => {
                if (loading) return 'Loading...';
                if (error) return <pre>{error.message}</pre>;

                return (
                    <div className={classes.categories}>
                        {data.categories.map(category => (
                            <li key={category.name} onClick={this.props.onClose}>
                                <NavLink to={`/products-list/${category.name}`} exact className={classes.category}
                                         activeClassName={classes.active}>
                                    {category.name.toUpperCase()}
                                </NavLink>
                            </li>
                        ))}
                    </div>
                )
            }}
        < /Query>
    }
}