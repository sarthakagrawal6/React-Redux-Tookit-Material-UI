import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiState, PaginatedQuery } from "interfaces/api.interface";
import { RootState } from "store";
import { http } from "utils/http.service";
import { Category } from "./categories.interface";
import { DEFAULT_PAGE_OPTIONS } from "constants/api.constants";

interface Categories {
  categories: Array<Category>;
  status: ApiState;
  error: string | null;
  total: number;
  pageOptions: PaginatedQuery;
}

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    total: 0,
    pageOptions: {
      ...DEFAULT_PAGE_OPTIONS,
    },
    error: null,
    status: "idle",
  } as Categories,
  reducers: {
    setCategoriesPaginatedQuery: (
      state,
      { payload }: { payload: PaginatedQuery }
    ) => {
      state.pageOptions.pageSize = payload.pageSize;
      state.pageOptions.pageIndex = payload.pageIndex;
      state.pageOptions.sort_by = payload.sort_by;
      state.pageOptions.sort_order = payload.sort_order;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched categories to the array
        state.categories = [...action.payload.result.data];
        state.total = action.payload.result.total;
        state.pageOptions.pageIndex = action.payload.result.pageIndex;
        state.pageOptions.pageSize = action.payload.result.pageSize;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (query: PaginatedQuery, { rejectWithValue }) => {
    try {
      const response = await http.get("admin/categories", query);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const selectCategories = (state: RootState) => state.categories;

export const { setCategoriesPaginatedQuery } = categoriesSlice.actions;

export default categoriesSlice.reducer;
