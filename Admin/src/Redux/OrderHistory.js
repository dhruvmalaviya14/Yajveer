import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const orderhistorydata = createAsyncThunk(
  "orderhistory/fectch",
  async (args, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/v1/users/admin/orderhistory`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }     
);

const OrderhistorySlice = createSlice({
  name: "OrderHistory",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(orderhistorydata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderhistorydata.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(orderhistorydata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default OrderhistorySlice.reducer;
export { orderhistorydata };
