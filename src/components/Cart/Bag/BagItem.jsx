import classes from "./Bag.module.css";
import React, {useState} from "react";

export function BagItem(props) {
    const [imgGallery, setImgGallery] = useState(0);

    function nextImg() {
        if (props.gallery.length > imgGallery && imgGallery !== props.gallery.length - 1) {
            setImgGallery(imgGallery + 1);
        } else if (imgGallery === props.gallery.length - 1) {
            setImgGallery(0);
        }
    }

    function previousImg() {
        if (imgGallery === 0) {
            setImgGallery(props.gallery.length - 1);
        } else if (props.gallery.length === 0) {
            setImgGallery(0);
        } else {
            setImgGallery(imgGallery - 1);
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes['bag-item']}>
                <div className={classes['item-info']}>
                    <h1 className={classes['item-brand']}>{props.brand}</h1>
                    <p className={classes['item-title']}>{props.name}</p>
                    <p className={classes['item-price']}>{props.prices.map((currency) => (
                        currency.currency.symbol === props.currencyId) && (props.currencyId + currency.amount))}
                    </p>
                    {props.attributes.map((attribute) => (
                        <div>
                            <p className={classes['attribute-title']}>{attribute.name.toUpperCase()}:</p>
                            <div className={classes.attributes}>
                                {
                                    attribute.name === 'Color' ?
                                        attribute.items.map((item) => (
                                            <button key={item.value} className={classes.color}
                                                    style={{backgroundColor: item.value}}></button>
                                        )) :
                                        attribute.items.map((item) => (
                                            <button key={item.value}
                                                    className={[classes['cart-btn'], classes.select].join(' ')}>{item.value}</button>
                                        ))
                                }
                            </div>
                        </div>
                    ))}
                </div>
                <div className={classes.flex}>
                    <div className={classes.amount}>
                        <button onClick={props.onAdd} className={classes['cart-btn']}>+</button>
                        <p>{props.amount}</p>
                        <button onClick={props.onRemove} className={classes['cart-btn']}>−</button>
                    </div>
                    <div className={classes['bag-img']}>
                        <img src={props.gallery[imgGallery]} alt={`${props.name} in shopping cart`}/>
                        <div className={classes.carousel}>
                            <div className={classes['carousel-btn']} onClick={previousImg}>
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white" strokeWidth="1.5"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className={classes['carousel-btn']} onClick={nextImg}>
                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white" strokeWidth="1.5"
                                          strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
    )
}