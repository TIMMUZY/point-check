import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './baseQueryWithReauth/baseQueryWithReauth'

export const userQuery = createApi({
  reducerPath: 'userQuery',
  tagTypes: ['User'],
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    // получить список всех пользователей
    getUserAll: build.query({
      query: () => '/api/v1/users',
      providesTags: ['User'],
    }),

    // изменение данных пользователей
    changeDataUser: build.mutation({
      query: (body) => ({
        url: `/api/v1/users`,
        method: 'PUT',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),

    // получить пользователя по id
    getUser: build.query({
      query: (id) => `/api/v1/users/${id}`,
      providesTags: ['User'],
    }),

    // удалить пользователя
    deleteUser: build.mutation({
      query: (body) => ({
        url: `/api/v1/users/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    // изменение роли пользователя
    changeRole: build.mutation({
      query: ({ id, role }) => ({
        url: `/api/v1/users/role/${id}?role=${role}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['User'],
    }),

    // изменение пароля пользователя
    changePassword: build.mutation({
      query: (body) => ({
        url: `/api/v1/users/password`,
        method: 'PATCH',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),

    // изменение почты пользователя
    changeEmail: build.mutation({
      query: (body) => ({
        url: `/api/v1/users/email`,
        method: 'PATCH',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['User'],
    }),

    // Поиск пользователя по почте
    getUserEmail: build.query({
      query: (email) => `/api/v1/users/email?email=${email}`,
      providesTags: ['User'],
    }),

    // Поиск пользователя по имени
    getUserName: build.query({
      query: (name) => `/api/v1/users/name?name=${name}`,
      providesTags: ['User'],
    }),
  }),
})

export const {
  useGetUserAllQuery,
  useChangeDataUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
  useChangeRoleMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useGetUserEmailQuery,
  useGetUserNameQuery,
} = userQuery
