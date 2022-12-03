import classes from "./Cart.module.css";

export function CartItem(props) {
    const selectedAttributes = props.id.substr(props.initId.length + 1).split('&');
    // console.log(selectedAttributes.map((attribute) => attribute).find(attribute => {return attribute === '40' ? attribute : undefined}));
    return (
        <div className={classes['cart-item']}>
            <div className={classes['item-info']}>
                <p className={classes['item-title']}>{props.brand}<br/>{props.name}</p>
                <p className={classes['item-price']}>{props.prices.map((currency) => (
                    currency.currency.symbol === props.currencyId) && (props.currencyId + currency.amount))}
                </p>
                {props.attributes.map((attribute) => (
                    <div>
                        <p className={classes['attribute-title']}>{attribute.name}:</p>
                        <div className={classes.attributes}>
                            {
                                attribute.name === 'Color' ?
                                    attribute.items.map((item) => (
                                        <button key={item.value}
                                                className={selectedAttributes.map((attribute) => attribute).find(attribute => {
                                                    return attribute === item.value ? attribute : undefined
                                                }) === item.value ? [classes['color'], classes['color-selected']].join(' ') : classes.color}
                                                style={{backgroundColor: item.value}}></button>
                                    )) :
                                    attribute.items.map((item) => (
                                        <button key={item.value}
                                                className={selectedAttributes.map((attribute) => attribute).find(attribute => {
                                                    return attribute === item.value ? attribute : undefined
                                                }) === item.value ?
                                                    [classes['cart-btn'], classes['selected']].join(' ') : classes['cart-btn']}>{item.value}</button>
                                    ))
                            }
                        </div>
                    </div>
                ))}
            </div>
            <div className={classes.amount}>
                <button onClick={props.onAdd} className={[classes['cart-btn'], classes['amount-btn']].join(' ')}>+
                </button>
                <p>{props.amount}</p>
                <button onClick={props.onRemove} className={[classes['cart-btn'], classes['amount-btn']].join(' ')}>−
                </button>
            </div>
            <div className={classes['cart-img']}>
                <img src={props.gallery[0]} alt={`${props.name} in shopping cart`}/>
            </div>
        </div>)
}