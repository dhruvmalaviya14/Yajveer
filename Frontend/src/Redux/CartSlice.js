import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error("Failed to load cart state:", err);
    return [];
  }
};

const saveCartState = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save cart state:", err);
  }
};

export const Fectchdata = createAsyncThunk(
  "products/Fectch",
  async (args, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/v1/products/`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    items: loadCartState().map((item) => ({
      ...item,
      quantity: Math.max(1, parseInt(item.quantity) || 1),
      price: parseFloat(item.price) || 0,
    })),
    loading: false,
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (cartItem) =>
          cartItem._id === item._id &&
          cartItem.selectedWeight === item.selectedWeight
      );
      if (existingItem) {
        const newQuantity =
          parseInt(existingItem.quantity) + parseInt(quantity);
        existingItem.quantity = newQuantity;
      } else {
        state.items.push({
          ...item,
          photos: [...(item.photos || [])], // Ensure photos array is properly copied
          quantity: parseInt(quantity),
          price: parseFloat(item.price),
        });
      }
      saveCartState(state.items);
    },
    removeFromCart: (state, action) => {
      const { _id, selectedWeight } = action.payload;
      state.items = state.items.filter(
        (item) => !(item._id === _id && item.selectedWeight === selectedWeight)
      );
      saveCartState(state.items);
    },
    updateQuantity: (state, action) => {
      const { _id, selectedWeight, quantity } = action.payload;
      const item = state.items.find(
        (item) => item._id === _id && item.selectedWeight === selectedWeight
      );
      if (item) {
        const newQuantity = Math.max(1, parseInt(quantity));
        item.quantity = newQuantity;
        item.price = parseFloat(item.price);

        // Save cart state after successful update
        saveCartState(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartState(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Fectchdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Fectchdata.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(Fectchdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export const selectCartItemsCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  CartSlice.actions;
export default CartSlice.reducer;
