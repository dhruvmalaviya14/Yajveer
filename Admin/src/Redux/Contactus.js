import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const contactdata = createAsyncThunk(
  "contactus/fectch",
  async (args, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/api/v1/users/getallcontacts`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const ContactUsSlice = createSlice({
  name: "contactus",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteContact: (state, action) => {
      const idToDelete = action.payload;
      state.data = state.data.filter((review) => review._id !== idToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(contactdata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(contactdata.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(contactdata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ContactUsSlice.reducer;
export const { deleteContact } = ContactUsSlice.actions;
export { contactdata };
