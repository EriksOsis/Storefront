import classes from "./Bag.module.css";
import React from "react";

export class BagItem extends React.Component {
    constructor(props) {
        super(props);
        this.nextImg = this.nextImg.bind(this);
        this.previousImg = this.previousImg.bind(this);
        this.state = {
            imgGallery: 0
        }
    }

    nextImg() {
        if (this.props.gallery.length > this.state.imgGallery && this.state.imgGallery !== this.props.gallery.length - 1) {
            this.setState({imgGallery: this.state.imgGallery + 1});
        } else if (this.state.imgGallery === this.props.gallery.length - 1) {
            this.setState({imgGallery: 0});
        }
    }

    previousImg() {
        if (this.state.imgGallery === 0) {
            this.setState({imgGallery: this.props.gallery.length - 1});
        } else if (this.props.gallery.length === 0) {
            this.setState({imgGallery: 0});
        } else {
            this.setState({imgGallery: this.state.imgGallery - 1});
        }
    }

    selectedAttributes = this.props.id.substr(this.props.initId.length + 1).split('&');

    render() {
        return (
            <div className={classes.wrapper}>
                <div className={classes['bag-item']}>
                    <div className={classes['item-info']}>
                        <h1 className={classes['item-brand']}>{this.props.brand}</h1>
                        <p className={classes['item-title']}>{this.props.name}</p>
                        <p className={classes['item-price']}>{this.props.prices.map((currency) => (
                            currency.currency.symbol === this.props.currencyId) && (this.props.currencyId + currency.amount))}
                        </p>
                        {this.props.attributes.map((attribute) => (
                            <div key={attribute.name}>
                                <p className={classes['attribute-title']}>{attribute.name.toUpperCase()}:</p>
                                <div className={classes.attributes}>
                                    {
                                        attribute.name === 'Color' ?
                                            attribute.items.map((item) => (
                                                <button key={item.value}
                                                        className={this.selectedAttributes.map((attribute) => attribute).find(attribute => {
                                                            return attribute === item.value ? attribute : undefined
                                                        }) === item.value ? [classes['color'], classes['color-selected']].join(' ') : classes.color}
                                                        style={{backgroundColor: item.value}}></button>
                                            )) :
                                            attribute.items.map((item) => (
                                                <button key={item.value}
                                                        className={this.selectedAttributes.map((attribute) => attribute).find(attribute => {
                                                            return attribute === item.value ? attribute : undefined
                                                        }) === item.value ?
                                                            [classes['cart-btn'], classes['select'], classes['selected']].join(' ')
                                                            : [classes['cart-btn'], classes.select].join(' ')}>
                                                    {item.value}
                                                </button>
                                            ))
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={classes.flex}>
                        <div className={classes.amount}>
                            <button onClick={this.props.onAdd}
                                    className={[classes['cart-btn'], classes['hover']].join(' ')}>+
                            </button>
                            <p>{this.props.amount}</p>
                            <button onClick={this.props.onRemove}
                                    className={[classes['cart-btn'], classes['hover']].join(' ')}>−
                            </button>
                        </div>
                        <div className={classes['bag-img']}>
                            <img src={this.props.gallery[this.state.imgGallery]}
                                 alt={`${this.props.name} in shopping cart`}/>
                            {this.props.gallery.length > 1 &&
                            <div className={classes.carousel}>
                                <div className={classes['carousel-btn']} onClick={this.previousImg}>
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white"
                                              strokeWidth="1.5"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div className={classes['carousel-btn']} onClick={this.nextImg}>
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white"
                                              strokeWidth="1.5"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}