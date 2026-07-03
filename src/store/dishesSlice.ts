import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const addDish = createAsyncThunk(
  "dishes/addDish",
  async (dishData: Omit<DishT, "id">, thunkAPI) => {
    try {
      const response = await axiosApi.post("/dishes.json", dishData);
      return { id: response.data.name, ...dishData };
    } catch (error) {
      return thunkAPI.rejectWithValue("Error! Cannot add this dish!");
    }
  },
);

export const updateDish = createAsyncThunk(
  "dishes/updateDish",
  async ({ id, dishData }: { id: string; dishData: Omit<DishT, "id"> }) => {
    await axiosApi.put(`/dishes/${id}.json`, dishData);
    return { id, ...dishData };
  },
);

export const deleteDish = createAsyncThunk(
  "dishes/deleteDish",
  async (id: string) => {
    await axiosApi.delete(`/dishes/${id}.json`);
    return id;
  },
);

const slice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error! Fetch error!";
      })

      .addCase(addDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes.push(action.payload);
      })
      .addCase(addDish.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error! Add error!";
      })

      .addCase(updateDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDish.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = state.dishes.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        );
      })
      .addCase(updateDish.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error! Add error!";
      })

      .addCase(deleteDish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDish.fulfilled, (state, action) => {
        state.loading = false;
        state.dishes = state.dishes.filter((d) => d.id !== action.payload);
      })
      .addCase(deleteDish.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Error! Delete dish error!";
      });
  },
});

export const dishesReducer = slice.reducer;
