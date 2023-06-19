import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ApiState } from "interfaces/api.interface";
import { RootState } from "store";
import { http } from "utils/http.service";
import { toastService } from "utils/toast.service";

interface Category {
  _id: string;
  categoryName: string;
  count: number;
  createdAt: Date | string;
  status: number;
  updatedAt: Date | string;
}
interface Categories {
  categories: Array<Category>;
  status: ApiState;
  error: any;
}

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    error: null,
    status: "idle",
  } as Categories,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "succeeded";

        // Add any fetched posts to the array
        state.categories = [...action.payload.result.data];
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);

        state.error = action.error.message;
        // toastService.showToast(action.error.message);
      });
  },
});
export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(
        "admin/categories?pageIndex=0&pageSize=10"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const selectCategoriesStatus = (state: RootState) =>
  state.categories.status;

export default categoriesSlice.reducer;
