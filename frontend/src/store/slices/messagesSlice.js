import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeChannelMessages: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.channelId !== action.payload
      );
    },
  },
});

export const { setMessages, addMessage, removeChannelMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
