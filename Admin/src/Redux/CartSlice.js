import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const Fectchdata = createAsyncThunk(
    'cart/Fectch',
    async (args, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/api/v1/products/`);
            const data = await response.json();
            return data.data;
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
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
    }
});

export default CartSlice.reducer;
export { Fectchdata };