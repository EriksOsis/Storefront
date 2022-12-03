import React from 'react';
import {CartContext} from "./Cart_context";
import {useReducer} from "react";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

function cartReducer(state, action) {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.prices.map((currency) => (
            currency.currency.symbol === '$') && currency.amount).find((price) => {return price !== false && price}) * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };

            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === "REMOVE") {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingItem = state.items[existingCartItemIndex];

        const updatedTotalAmount = state.totalAmount - existingItem.prices;

        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {...existingItem, amount: existingItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if (action.type === 'CLEAR') {
        return {
            defaultCartState
        }
    }
    return defaultCartState;
}

export function CartProvider(props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    function addItemsToCartHandler(item) {
        console.log(item);
        dispatchCartAction({type: 'ADD', item: item});
    }

    function removeItemFromCartHandler(id) {
        dispatchCartAction({type: 'REMOVE', id: id});
    }

    function clearCartHandler() {
        dispatchCartAction({type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemsToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}