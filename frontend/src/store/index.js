import { configureStore } from '@reduxjs/toolkit'
import channelsApi from './api/channelsApi'
import messagesApi from './api/messagesApi'
import currentChannelReducer from './slices/channelsSlice'
import modalsReducer from './slices/modalsSlice'

const store = configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    currentChannel: currentChannelReducer,
    modals: modalsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(channelsApi.middleware)
    .concat(messagesApi.middleware),
})

export default store
