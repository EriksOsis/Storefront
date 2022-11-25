import {CartContext} from "./Cart_context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

function cartReducer(state, action) {
    if (action.type === 'ADD') {
        console.log('aaaa');
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.amount;
        // action.item.price *
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
}

export function CartProvider(props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    function addItemToCartHandler(item) {
        console.log('added');
        dispatchCartAction({type: 'ADD', item: item});
    }

    function removeItemToCartHandler(id) {
        dispatchCartAction({type: 'REMOVE', id: id});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}