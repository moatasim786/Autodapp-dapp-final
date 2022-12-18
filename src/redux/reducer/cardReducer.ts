import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface cardProps {
  cardItem: any;
}

const cardSlide = createSlice({
  name: 'card',
  initialState: {
    cardItem: null,
  } as cardProps,
  reducers: {
    setCard: (state, action: PayloadAction<any>) => {
      state.cardItem = action.payload;
    },
  },
});

export const { setCard } = cardSlide.actions;
export default cardSlide.reducer;
