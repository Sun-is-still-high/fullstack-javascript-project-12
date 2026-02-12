import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => '/messages',
    }),
    sendMessage: builder.mutation({
      query: message => ({
        url: '/messages',
        method: 'POST',
        body: {
          ...message,
          username: localStorage.getItem('username'),
        },
      }),
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi

export default messagesApi
