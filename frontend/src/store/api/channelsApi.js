import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const DEFAULT_CHANNEL_ID = 1

const channelsApi = createApi({
  reducerPath: 'channelsApi',
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
    getChannels: builder.query({
      query: () => '/channels',
    }),
    addChannel: builder.mutation({
      query: channel => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
    }),
    removeChannel: builder.mutation({
      query: id => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi

export { DEFAULT_CHANNEL_ID }

export default channelsApi
