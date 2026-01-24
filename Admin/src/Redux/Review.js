import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fectchdata = createAsyncThunk(
  "reviwes/fectch",
  async (args, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/v1/users/getallreview`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ReviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteReview: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((review) => review._id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fectchdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fectchdata.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fectchdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ReviewsSlice.reducer;
export const { deleteReview } = ReviewsSlice.actions;
export { fectchdata };
