import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchShoes } from './asyncActions';
import { Shoes, ShoesSliceState, Status } from './types';

const initialState: ShoesSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const shoesSlice = createSlice({
  name: 'shoes',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Shoes[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShoes.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchShoes.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchShoes.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = shoesSlice.actions;

export default shoesSlice.reducer;
