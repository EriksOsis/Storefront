import React from "react";
import classes from './App.module.css';
import {Redirect, Route, Switch} from "react-router-dom";
import ProductList from "./components/Product List/ProductList";
import {Nav} from "./components/UI/Nav";
import ProductPage from "./components/Product List/ProductPage";
import {gql} from "@apollo/client";
import {Bag} from "./components/Cart/Bag/Bag";
import {CartProvider} from "./store/Cart_provider";
import {CartContext} from "./store/Cart_context";

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

class App extends React.Component {
    static contextType = CartContext;

    constructor(props) {
        super(props);

        this.state = {
            currency: '$',
            dropdownClasses: classes['select-menu'],
            arrowClasses: classes.arrow
        }

        this.dropdownHandler = this.dropdownHandler.bind(this);
        this.currencyHandler = this.currencyHandler.bind(this);
    }

    componentDidMount() {
        const storedCurrency = localStorage.getItem('currency');
        if (storedCurrency) {
            this.setState({ currency: storedCurrency });
        }
        document.body.addEventListener('click', this.dropDownCloser);
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.dropDownCloser);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currency !== this.state.currency) {
            localStorage.setItem('currency', this.state.currency);
        }
    }

    dropDownCloser = (event) => {
        if (event.path[0].tagName !== 'BUTTON') {
            this.setState({
                dropdownClasses: classes['select-menu'],
                arrowClasses: classes['arrow']
            });
        }
    }

    dropdownHandler() {
        if (this.state.dropdownClasses === classes['select-menu']) {
            this.setState({
                dropdownClasses: classes['select-menu-open'],
                arrowClasses: classes['arrow-active']
            });
        } else {
            this.setState({
                dropdownClasses: classes['select-menu'],
                arrowClasses: classes['arrow']
            });
        }
    }

    currencyHandler(event) {
        this.setState({
            currency: event.target.value,
            dropdownClasses: classes['select-menu'],
            arrowClasses: classes['arrow']
        });
    }

    render() {
        const {currency, dropdownClasses, arrowClasses} = this.state;

        return (
            <CartProvider>
                <Switch>
                    <Route path={'/'} exact>
                        <Redirect to={'/products-list/:category'}/>
                    </Route>
                    <div className={classes["App"]}>
                        <Nav onConvert={this.currencyHandler} onOpen={this.dropdownHandler}
                             arrowClasses={arrowClasses} dropDownClasses={dropdownClasses} currencyId={currency}
                             query={CURRENCY_QUERY}/>
                        <Route path={'/products-list/:category'}
                               render={(props) => <React.Fragment>
                                   <Redirect to={'/products-list/all'}/>
                                   <ProductList currencyId={currency} query={PRODUCTS_QUERY} {...props}/>
                               </React.Fragment>} exact>
                        </Route>
                        <Route path={'/product/:id'} render={(props) => (
                            <ProductPage currencyId={currency} query={PRODUCTS_QUERY} {...props}/>
                        )}/>
                        <Route path={'/bag'}>
                            <Bag currencyId={currency}/>
                        </Route>
                    </div>
                </Switch>
            </CartProvider>
        );
    }
}

export default App;