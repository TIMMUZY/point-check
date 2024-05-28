import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithReauth from './baseQueryWithReauth/baseQueryWithReauth'

export const passQuery = createApi({
  reducerPath: 'passQuery',
  tagTypes: ['Pass', 'Car', 'Brands', 'Visitor'],
  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    // получить список всех пропусков по ролям
    getPassAll: build.query({
      query: (endpoint = '') => `/api/v1/passes${endpoint}`,
      providesTags: ['Pass'],
    }),

    // получить список пропусков конкретного пользователя
    getPassUser: build.query({
      query: (id) => `/api/v1/passes/users/${id}`,
      providesTags: ['Pass'],
    }),

    // найти пропуск по id
    getPass: build.query({
      query: (id) => `/api/v1/passes/${id}`,
      providesTags: ['Pass'],
    }),

    // получить список пропусков на конкретную территорию
    getPassTerritory: build.query({
      query: ({ id, endpoint = '' }) =>
        `/api/v1/passes/territories/${id}${endpoint}`,
      providesTags: ['Pass'],
    }),

    // получить список событий по конкретной территории
    getEventsAll: build.query({
      query: (endpoint = '') => `/api/v1/events/${endpoint}`,
      providesTags: ['Pass'],
    }),

    // добавить новый пропуск
    addPass: build.mutation({
      query: (body) => ({
        url: '/api/v1/passes',
        method: 'POST',
        body: JSON.stringify({
          userId: body.userID,
          comment: body.commentPass,
          timeType: body.typeTimePass,
          territoryId: body.territoryID,
          startTime: body.startTimePass + ':00.000Z',
          endTime: body.endTimePass + ':00.000Z',
          ...(body.isAutoPass
            ? {
                car: {
                  ...(body.carID && { id: body.carID }),
                  licensePlate: body.licensePlateCar,
                  brand: {
                    brand: body.brandCar,
                  },
                  phone: body.tel,
                },
              }
            : {
                visitor: {
                  ...(body.visitorID && { id: body.visitorID }),
                  name: body.nameVisitor,
                  phone: body.tel,
                  note: body.commentPass,
                },
              }),
        }),
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Pass', 'Car', 'Brands', 'Visitor'],
    }),

    // изменить существующий пропуск
    updatePass: build.mutation({
      query: (body) => ({
        url: `/api/v1/passes`,
        method: 'PUT',
        body: JSON.stringify({
          id: body.id,
          userId: body.userID,
          comment: body.commentPass,
          timeType: body.typeTimePass,
          startTime: body.startTimePass + ':00.000Z',
          endTime: body.endTimePass + ':00.000Z',
          ...(body.isAutoPass
            ? {
                car: {
                  ...(body.carID && { id: body.carID }),
                  licensePlate: body.licensePlateCar,
                  brand: {
                    brand: body.brandCar,
                  },
                  phone: body.tel,
                },
              }
            : {
                visitor: {
                  ...(body.visitorID && { id: body.visitorID }),
                  name: body.nameVisitor,
                  phone: body.tel,
                  note: body.commentPass,
                },
              }),
        }),
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Pass', 'Car', 'Brands', 'Visitor'],
    }),

    // отметить выполненным пропуск со статусом Warning (время истекло, последнее пересечение на выезд)
    markUnwarning: build.mutation({
      query: (body) => ({
        url: `/api/v1/passes/${body.id}/unwarning`,
        method: 'PATCH',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Pass'],
    }),

    // отметить пропуск как НЕизбранный
    markNotFavorite: build.mutation({
      query: (body) => ({
        url: `/api/v1/passes/${body.id}/not_favorite`,
        method: 'PATCH',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Pass'],
    }),

    // отметить пропуск как избранный
    markFavorite: build.mutation({
      query: (body) => ({
        url: `/api/v1/passes/${body.id}/favorite`,
        method: 'PATCH',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Pass'],
    }),

    // отменить активный пропуск
    cancelActivePass: build.mutation({
      query: (body) => ({
        url: `/api/v1/passes/${body.id}/cancel`,
        method: 'PATCH',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Pass'],
    }),

    // активировать отмененный пропуск
    activatePass: build.mutation({
      query: (body) => ({
        url: `/api/v1/passes/${body.id}/activate`,
        method: 'PATCH',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Pass'],
    }),

    // удалить пропуск
    deletePass: build.mutation({
      query: (body) => ({
        url: `/api/v1/passes/${body.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pass', 'Car', 'Brands', 'Visitor'],
    }),

    // получить список всех брендов
    getCarBrandsAll: build.query({
      query: () => '/api/v1/cars/brands',
      providesTags: ['Brands'],
    }),

    // добавить новый бренд машины
    addBrandCar: build.mutation({
      query: (body) => ({
        url: '/api/v1/cars/brands',
        method: 'POST',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Brands'],
    }),

    // получить список всех машин
    getCarAll: build.query({
      query: () => '/api/v1/cars',
      providesTags: ['Car'],
    }),

    // получить список всех машин по user
    getCarUser: build.query({
      query: (id) => `/api/v1/cars/users/${id}`,
      providesTags: ['Car'],
    }),

    // добавить новую машину
    addCar: build.mutation({
      query: (body) => ({
        url: '/api/v1/cars',
        method: 'POST',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Car'],
    }),

    // получить список всех посетителей юзера
    getVisitorUser: build.query({
      query: (id) => `/api/v1/visitors/users/${id}`,
      providesTags: ['Visitor'],
    }),

    // добавить нового посетителя
    addVisitor: build.mutation({
      query: (body) => ({
        url: '/api/v1/visitors',
        method: 'POST',
        body,
        headers: {
          'content-type': 'application/json',
        },
      }),
      invalidatesTags: ['Visitor'],
    }),
  }),
})

export const {
  useGetPassAllQuery,
  useLazyGetPassAllQuery,
  useGetPassUserQuery,
  useGetPassQuery,
  useGetEventsPassUserQuery,
  useGetPassTerritoryQuery,
  useAddPassMutation,
  useUpdatePassMutation,
  useMarkUnwarningMutation,
  useMarkNotFavoriteMutation,
  useMarkFavoriteMutation,
  useCancelActivePassMutation,
  useActivatePassMutation,
  useDeletePassMutation,

  useGetCarBrandsAllQuery,
  useAddBrandCarMutation,
  useGetCarAllQuery,
  useGetCarUserQuery,
  useAddCarMutation,

  useGetVisitorUserQuery,
  useAddVisitorMutation,
  useGetEventsAllQuery,
} = passQuery
