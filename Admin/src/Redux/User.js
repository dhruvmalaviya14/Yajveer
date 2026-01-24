import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fectchuserdata = createAsyncThunk(
  "users/fectch",
  async (args, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/v1/users/gettotalusers`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const UsersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fectchuserdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fectchuserdata.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fectchuserdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default UsersSlice.reducer;
export { fectchuserdata };
