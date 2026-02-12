import io from 'socket.io-client'
import store from '../store'
import channelsApi from '../store/api/channelsApi'
import messagesApi from '../store/api/messagesApi'
import { setCurrentChannel, DEFAULT_CHANNEL_ID } from '../store/slices/channelsSlice'

let socket = null

export const initSocket = () => {
  if (socket) return socket

  socket = io()

  socket.on('newMessage', (message) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(message)
      }),
    )
  })

  socket.on('newChannel', (channel) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel)
      }),
    )
  })

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const index = draft.findIndex(ch => ch.id === id)
        if (index !== -1) draft.splice(index, 1)
      }),
    )
    const { currentChannelId } = store.getState().currentChannel
    if (currentChannelId === id) {
      store.dispatch(setCurrentChannel(DEFAULT_CHANNEL_ID))
    }
  })

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const channel = draft.find(ch => ch.id === id)
        if (channel) channel.name = name
      }),
    )
  })

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
