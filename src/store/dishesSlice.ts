import { createAsyncThunk } from "@reduxjs/toolkit";
import type { DishT } from "../types";
import { axiosApi } from "../api/axiosApi";

interface DishesState {
  dishes: DishT[];
  loading: boolean;
  error: string | null;
}

const initialState: DishesState = {
  dishes: [],
  loading: false,
  error: null,
};

export const fetchDishes = createAsyncThunk("dishes/fetchDishes", async () => {
  const response = await axiosApi.get("/dishes.json");
  if (!response.data) return [];

  return Object.keys(response.data).map((d) => ({
    id: d,
    ...response.data[d],
  }));
});

