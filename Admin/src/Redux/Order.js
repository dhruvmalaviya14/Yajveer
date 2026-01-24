import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const orderdata = createAsyncThunk("order/fectch", async (args, thunkAPI) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER}/api/v1/users/admin/orders`
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    addOrder: (state, action) => {
      const incoming = action.payload;
      if (!state.data.some((o) => o._id === incoming._id)) {
        state.data.unshift(incoming); 
      }
    },
    deleteOrder: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((review) => review.orderId !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderdata.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(orderdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default OrderSlice.reducer;
export const { deleteOrder , addOrder } = OrderSlice.actions;
export { orderdata };
