import { configureStore } from "@reduxjs/toolkit";
import CartReducer  from "./slices/CartSlice";
import ProductReducer from "./slices/ProductSlice";
import CategoryReducer from "./slices/CategorySlice";

export const store = configureStore({
    reducer:{
        cart: CartReducer,
        products:ProductReducer,
        category:CategoryReducer
    }
});