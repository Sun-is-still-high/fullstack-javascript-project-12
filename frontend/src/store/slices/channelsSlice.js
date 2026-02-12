import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_CHANNEL_ID = 1

const channelsSlice = createSlice({
  name: 'currentChannel',
  initialState: {
    currentChannelId: DEFAULT_CHANNEL_ID,
  },
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload
    },
  },
})

export const { setCurrentChannel } = channelsSlice.actions
export { DEFAULT_CHANNEL_ID }
export default channelsSlice.reducer
