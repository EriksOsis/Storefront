import React, {useContext, useEffect, useState, useRef} from "react";
import classes from './App.module.css';
import {Redirect, Route, Switch} from "react-router-dom";
import Product from "./components/Product List/Product";
import {Nav} from "./components/UI/Nav";
import {ProductPage} from "./components/Product List/ProductPage";
import {gql} from "@apollo/client";
import {CartContext} from "./store/Cart_context";
import {CartProvider} from "./store/Cart_provider";

const PRODUCTS_QUERY = gql`
{
    category {
      products {
        brand
        inStock
        name
        id
        gallery
        description
        category
        attributes {
          name
          type
          items {
            id
            value
            displayValue
          }
          id
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
}`;

const CURRENCY_QUERY = gql`
{
    currencies {
        label
        symbol
    }
}`;

function App() {
    const [currency, setCurrency] = useState('$');
    const [dropdownClasses, setDropdownClasses] = useState(classes['select-menu']);
    const [arrowClasses, setArrowClasses] = useState(classes.arrow);

    const amountInputRef = useRef();

    const cartContext = useContext(CartContext);

    useEffect(() => {
        function dropDownCloser(event) {
            if (event.path[0].tagName !== 'BUTTON') {
                setDropdownClasses(classes['select-menu']);
                setArrowClasses(classes['arrow']);
            }
        }

        document.body.addEventListener('click', dropDownCloser);

        return () => document.body.removeEventListener('click', dropDownCloser);
    }, []);

    function dropdownHandler() {
        if (dropdownClasses === classes['select-menu']) {
            setDropdownClasses(classes['select-menu-open']);
            setArrowClasses(classes['arrow-active']);
        } else {
            setDropdownClasses(classes['select-menu']);
            setArrowClasses(classes['arrow']);
        }
    }

    function currencyHandler(event) {
        setCurrency(event.target.value);
        setDropdownClasses(classes['select-menu']);
        setArrowClasses(classes['arrow']);
    }


    function onAddToCartHandler() {
        console.log(cartContext.items.length);
        cartContext.addItem({
            name: 'product',
            amount: 1
        });
    }

    return (
        <Switch>
            <Route path={'/'} exact>
                <Redirect to={'/products-list/:category'}/>
            </Route>
            <CartProvider>
                <div className={classes["App"]}>
                    <Nav onConvert={currencyHandler} onOpen={dropdownHandler}
                         arrowClasses={arrowClasses}
                         dropDownClasses={dropdownClasses} currencyId={currency} query={CURRENCY_QUERY}/>
                    <Route path={'/products-list/:category'} exact>
                        <Redirect to={'/products-list/all'}/>
                        <Product ref={amountInputRef} currencyId={currency} query={PRODUCTS_QUERY}
                                 onAddToCart={onAddToCartHandler}/>
                    </Route>
                    <Route path={'/product/:id'}>
                        <ProductPage currencyId={currency} query={PRODUCTS_QUERY}/>
                    </Route>
                </div>
            </CartProvider>
        </Switch>
    );
}

export default App;
