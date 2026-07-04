import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearCart } from "./cartSlice";
import type { AppDispatch } from "./store";
import type { OrderData } from "../types";
import { axiosApi } from "../api/axiosApi";

export const createOrder = createAsyncThunk<
  void,
  OrderData,
  { dispatch: AppDispatch }
>("orders/createOrder", async (orderData, { dispatch }) => {
  await axiosApi.post("/orders.json", orderData);
  dispatch(clearCart());
});
