import { createSlice } from '@reduxjs/toolkit';

interface BasketState {
  count: number;
}

const initialState: BasketState = {
  count: 0,
};

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    incrementBasket: (state) => {
      state.count += 1;
    },
    resetBasket: (state) => {
      state.count = 0;
    },
  },
});

export const { incrementBasket, resetBasket } = basketSlice.actions;
export default basketSlice.reducer;
