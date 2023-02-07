import React, {Component} from "react";
import classes from "./ProductPage.module.css";
import {CartContext} from "../../store/Cart_context";

export class ProductPageContent extends Component {
    parse = require('html-react-parser');
    static contextType = CartContext;

    state = {
        spotlight: false,
        source: '',
        selectedAttributes: {},
    }

    constructor(props) {
        super(props);

        this.onAddToCartHandler = this.onAddToCartHandler.bind(this);
        this.setImg = this.setImg.bind(this);
        this.changeOptionHandler = this.changeOptionHandler.bind(this);

        const defaultAttributes = {};
        props.attributes.forEach(attribute => {
            const key = attribute.name;
            defaultAttributes[key] = attribute.items[0].value;
        });
        this.state.selectedAttributes = defaultAttributes;
    }


    changeOptionHandler(key, value) {
        const newValue = {};
        newValue[key] = value;
        this.setState({
            selectedAttributes: {...(this.state.selectedAttributes), ...newValue},
        });
    }

    setImg(event) {
        this.setState({
            spotlight: true,
            source: event.target.src
        });
    }

    onAddToCartHandler() {
        this.context.addItem({
            id: `${this.props.id}_${Object.values(this.state.selectedAttributes).join('&')}`,
            initId: this.props.id,
            name: this.props.name,
            amount: 1,
            prices: this.props.prices,
            brand: this.props.brand,
            attributes: this.props.attributes,
            gallery: this.props.gallery
        });
    }


    render() {
        const productId = `${this.props.id}_${Object.values(this.state.selectedAttributes).join('&')}`;
        const chosenAttributes = productId.substr(this.props.id.length + 1).split('&');

        return (
            <div className={classes['product-page']}>
                <section className={classes.gallery}>
                    {this.props.gallery.map((picture) =>
                        <div key={picture}>
                            <img src={picture} onClick={this.setImg} alt={'product gallery picture'}/>
                        </div>)}
                </section>
                <section className={classes.spotlight}>
                    <img src={!this.state.spotlight ? this.props.gallery[0] : this.state.source}
                         alt={'product picture'}/>
                </section>
                <section className={classes['product-info']}>
                    <h1>{this.props.brand}</h1>
                    <h1 className={classes.title}>{this.props.name}</h1>
                    {this.props.attributes.map((attribute) => (
                        <div key={attribute.name}>
                            <h2>{attribute.name.toUpperCase()}:</h2>
                            <div className={classes.attributes}>
                                {
                                    attribute.name === 'Color' ?
                                        attribute.items.map((item) => (
                                            <button key={item.value} onClick={() => {
                                                this.changeOptionHandler(attribute.name, item.value);
                                            }}
                                                    className={chosenAttributes.map((attribute) =>
                                                        attribute).find(attribute => {
                                                        return attribute === item.value ? attribute : undefined
                                                    }) === item.value ? [classes['color'], classes['color-selected']].join(' ')
                                                        : classes.color} style={{backgroundColor: item.value}}></button>
                                        )) :
                                        attribute.items.map((item) => (
                                            <button key={item.value} onClick={() => {
                                                this.changeOptionHandler(attribute.name, item.value);
                                            }} value={item.value}
                                                    className={chosenAttributes.map((attribute) =>
                                                        attribute).find(attribute => {
                                                        return item.value === attribute ? attribute : undefined
                                                    }) === item.value ?
                                                        [classes['size'], classes['selected']].join(' ')
                                                        : classes['size']}>{item.value}</button>

                                        ))
                                }
                            </div>
                        </div>
                    ))}
                    <h2>PRICE:</h2>
                    <p className={classes.price}>
                        {this.props.prices.map((currency) => (
                            currency.currency.symbol === this.props.currencyId) && (this.props.currencyId + currency.amount)
                        )}
                    </p>
                    {this.props.inStock &&
                        <button onClick={this.onAddToCartHandler} className={classes['add-to-cart']}>
                            ADD TO CART
                        </button>}
                    <div className={classes.description}>
                        {this.parse(this.props.description)}
                    </div>
                </section>
            </div>
        )
    }
}

