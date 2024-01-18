import {ShoppingCartItem, CategoryBookItem} from "../Components/types";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR',
    DELETE: 'DELETE'
};

export type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE'  | 'CLEAR' | 'DELETE';
    item: CategoryBookItem;
}
export const cartReducer = (state:ShoppingCartItem[], action:AppActions) => {
    const existingItem = state.find((item) => item.id === action.id);

    switch (action.type) {
        case CartTypes.ADD:
            /*
                The following only added the item in the cart for the first time with quantity 1.
                You have to handle the increment of the quantity if the item
                is already in the cart
              */

            if (existingItem) {
                // If the item is already in the cart, update its quantity
                return state.map((item) =>
                    item.id === action.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If the item is not in the cart, add it with quantity 1
                return [
                    ...state,
                    { id: action.id, book: action.item, quantity: 1 },
                ];
            }
        case CartTypes.REMOVE:
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    // If the item's quantity is 1, remove it from the cart
                    return state.filter((item) => item.id !== action.id);
                } else {
                    // If the item's quantity is greater than 1, decrease its quantity by 1
                    return state.map((item) =>
                        item.id === action.id
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                }
            } else {
                // Item not found, return the current state
                return state;
            }
        case CartTypes.CLEAR:
            return [];    // will be defined in Project 7
        case CartTypes.DELETE:
            return state.filter((item) => item.id !== action.id);
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};
