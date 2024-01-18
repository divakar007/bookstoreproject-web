import {createContext, Dispatch, ReactNode, useReducer} from "react";
import { ShoppingCartItem} from "../Components/types";
import {cartReducer} from "../reducers/CartReducer";

const initialCartState:ShoppingCartItem[] =  []
export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const storageKey = 'cart';
    const [cart, dispatch] =useReducer(cartReducer, initialCartState,
        (initialState) => {
            try {
                const storedCart = JSON.parse(localStorage.getItem(storageKey) || '[]');
                return storedCart as ShoppingCartItem[] || initialState;
            } catch (error) {
                console.log('Error parsing cart', error);
                return initialState;
            }
        },
    );
    return (
        <CartStore.Provider value={{ cart, dispatch }}>
            {children}
        </CartStore.Provider>
    );
};

CartProvider.displayName = 'CartProvider';