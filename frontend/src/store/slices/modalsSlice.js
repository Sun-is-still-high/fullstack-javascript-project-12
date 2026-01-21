import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  isOpen: false,
  extra: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { type, extra } = action.payload;
      state.type = type;
      state.isOpen = true;
      state.extra = extra || null;
    },
    closeModal: (state) => {
      state.type = null;
      state.isOpen = false;
      state.extra = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
