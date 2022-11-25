import {Link} from "react-router-dom";
import classes from './Cart.module.css';
import {Modal} from "./Modal";

export function Cart(props) {

    return (
        <Modal onClose={props.onClose} className={classes.modal}>
            <div className={classes.cart}>
                <h1 className={classes.top}>My Bag, <span>3 items</span></h1>
                <div className={classes['cart-item']}>
                    <div className={classes['item-info']}>
                        <p className={classes['item-title']}>Apollo Running Short</p>
                        <p className={classes['item-price']}>$50.00</p>
                        <p className={classes['attribute-title']}>Size:</p>
                        <div className={classes.attributes}>
                            <button className={classes['cart-btn']}>XS</button>
                            <button className={classes['cart-btn']}>S</button>
                            <button className={classes['cart-btn']}>M</button>
                            <button className={classes['cart-btn']}>L</button>
                        </div>
                        <p className={classes['attribute-title']}>Color:</p>
                        <div className={classes.attributes}>
                            <button className={classes.color} style={{backgroundColor: "green"}}></button>
                            <button className={classes.color} style={{backgroundColor: "cyan"}}></button>
                            <button className={classes.color} style={{backgroundColor: "blue"}}></button>
                            <button className={classes.color} style={{backgroundColor: "black"}}></button>
                            <button className={classes.color} style={{backgroundColor: "white"}}></button>
                        </div>
                    </div>
                    <div className={classes.amount}>
                        <button className={classes['cart-btn']}>+</button>
                        <p>1</p>
                        <button className={classes['cart-btn']}>-</button>
                    </div>
                    <div className={classes['cart-img']}>
                        <img
                            src={'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'}
                            alt={'Cart item'}/>
                    </div>
                </div>
                <div className={classes['cart-item']}>
                    <div className={classes['item-info']}>
                        <p className={classes['item-title']}>Apollo Running Short</p>
                        <p className={classes['item-price']}>$50.00</p>
                        <p className={classes['attribute-title']}>Size:</p>
                        <div className={classes.attributes}>
                            <button className={classes['cart-btn']}>XS</button>
                            <button className={classes['cart-btn']}>S</button>
                            <button className={classes['cart-btn']}>M</button>
                            <button className={classes['cart-btn']}>L</button>
                        </div>
                        <p className={classes['attribute-title']}>Color:</p>
                        <div className={classes.attributes}>
                            <button className={classes.color} style={{backgroundColor: "green"}}></button>
                            <button className={classes.color} style={{backgroundColor: "cyan"}}></button>
                            <button className={classes.color} style={{backgroundColor: "blue"}}></button>
                            <button className={classes.color} style={{backgroundColor: "black"}}></button>
                            <button className={classes.color} style={{backgroundColor: "white"}}></button>
                        </div>
                    </div>
                    <div className={classes.amount}>
                        <button className={classes['cart-btn']}>+</button>
                        <p>1</p>
                        <button className={classes['cart-btn']}>-</button>
                    </div>
                    <div className={classes['cart-img']}>
                        <img
                            src={'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087'}
                            alt={'Cart item'}/>
                    </div>
                </div>
                <div className={classes['cart-total']}>
                    <p>Total</p>
                    <p className={classes.bold}>$200.00</p>
                </div>
                <div className={classes.actions}>
                    <Link className={classes['view-bag']}>VIEW BAG</Link>
                    <Link className={classes['check-out']}>CHECK OUT</Link>
                </div>
            </div>
        </Modal>
    )
}