import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './baseQueryWithReauth/baseQueryWithReauth'

export const territoryQuery = createApi({
  reducerPath: 'territoryQuery',
  tagTypes: ['Territory'],
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    // получить список всех территорий
    getTerritoryAll: build.query({
      query: () => '/api/v1/territories',
      providesTags: ['Territory'],
    }),

    // получить список территорий пользователя
    getTerritoryUser: build.query({
      query: (id) => `/api/v1/users/${id}/territories`,
      providesTags: ['Territory'],
    }),

    // добавить новую территорию
    addTerritory: build.mutation({
      query: (body) => ({
        url: '/api/v1/territories',
        method: 'POST',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Territory'],
    }),

    // прикрепить пользователя к территории
    addUserToTerritory: build.mutation({
      query: ({ territoryId, userId }) => ({
        url: `/api/v1/territories/${territoryId}/users/${userId}`,
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Territory'],
    }),

    // открепить пользователя от территории
    deleteUserToTerritory: build.mutation({
      query: ({ territoryId, userId }) => ({
        url: `/api/v1/territories/${territoryId}/users/${userId}`,
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Territory'],
    }),
  }),
})

export const {
  useGetTerritoryAllQuery,
  useGetTerritoryUserQuery,
  useLazyGetTerritoryUserQuery,
  useAddTerritoryMutation,
  useAddUserToTerritoryMutation,
  useDeleteUserToTerritoryMutation,
} = territoryQuery
