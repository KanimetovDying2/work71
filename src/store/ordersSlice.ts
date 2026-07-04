import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearCart } from "./cartSlice";
import type { AppDispatch } from "./store";
import type { OrderData, OrderT } from "../types";
import { axiosApi } from "../api/axiosApi";

interface OrdersState {
  orders: OrderT[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk<
  void,
  OrderData,
  { dispatch: AppDispatch }
>("orders/createOrder", async (orderData, { dispatch, rejectWithValue }) => {
  try {
    await axiosApi.post("/orders.json", orderData);
    dispatch(clearCart());
  } catch (e) {
    return rejectWithValue("Error! Can't create order!");
  }
});

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/orders.json");
      if (!response.data) return [];
      return Object.keys(response.data).map((id) => ({
        id,
        ...response.data[id],
      }));
    } catch (e) {
      return rejectWithValue("Error! Error fetch orders!");
    }
  },
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosApi.delete(`/orders/${id}.json`);
      return id;
    } catch (e) {
      return rejectWithValue("Error! Could not delete order!");
    }
  },
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((o) => o.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
