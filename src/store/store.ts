import { configureStore } from "@reduxjs/toolkit";
import { dishesReducer } from "./dishesSlice";
import { cartReducer } from "./cartSlice";
import { ordersReducer } from "./ordersSlice";

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
