import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './baseQueryWithReauth/baseQueryWithReauth'

export const checkpointQuery = createApi({
  reducerPath: 'checkpointQuery',
  tagTypes: ['Checkpoint'],
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    // получить список всех КПП
    getCheckpointAll: build.query({
      query: () => '/api/v1/checkpoints',
      providesTags: ['Checkpoint'],
    }),

    // измененить существующий КПП
    changeСheckpoint: build.mutation({
      query: ({ name, type, note, territoryId }) => ({
        url: `/api/v1/checkpoints`,
        method: 'PUT',
        body: JSON.stringify({
          name: name,
          type: type,
          note: note,
          territory: {
            id: territoryId,
          },
        }),
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Сheckpoint'],
    }),

    // добавить новый КПП
    addCheckpoint: build.mutation({
      query: ({ name, type, note, territoryId }) => ({
        url: '/api/v1/checkpoints',
        method: 'POST',
        body: JSON.stringify({
          name: name,
          type: type,
          note: note,
          territory: {
            id: territoryId,
          },
        }),
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Сheckpoint'],
    }),

    // получить КПП по id
    getСheckpoint: build.query({
      query: (id) => `/api/v1/checkpoints/${id}`,
      providesTags: ['Сheckpoint'],
    }),

    // получить КПП по id территории
    getСheckpointTerritory: build.query({
      query: (id) => `/api/v1/checkpoints/territories/${id}`,
      providesTags: ['Сheckpoint'],
    }),

    // удалить КПП
    deleteСheckpoint: build.mutation({
      query: (body) => ({
        url: `/api/v1/checkpoint/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Checkpoint'],
    }),
  }),
})

export const {
  useGetCheckpointAllQuery,
  useChangeСheckpointMutation,
  useAddCheckpointMutation,
  useGetСheckpointQuery,
  useDeleteСheckpointMutation,
  useLazyGetСheckpointTerritoryQuery,
} = checkpointQuery
