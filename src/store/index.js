import { configureStore } from '@reduxjs/toolkit'
import avatarReducer from './slices/avatarSlice'
import territoryReducer from './slices/territorySlice'
import passReducer from './slices/passSlice'
import changeReducer from './slices/changeSlice'
import filterUsers from './slices/filterUsersSlice'
import { passQuery } from './RTKQuery/pass'
import { territoryQuery } from './RTKQuery/territory'
import { userQuery } from './RTKQuery/user'
import { checkpointQuery } from './RTKQuery/checkpoint'

export const store = configureStore({
  reducer: {
    avatar: avatarReducer,
    territory: territoryReducer,
    pass: passReducer,
    isChange: changeReducer,
    filterUsers,

    [passQuery.reducerPath]: passQuery.reducer,
    [territoryQuery.reducerPath]: territoryQuery.reducer,
    [userQuery.reducerPath]: userQuery.reducer,
    [checkpointQuery.reducerPath]: checkpointQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(passQuery.middleware)
      .concat(territoryQuery.middleware)
      .concat(userQuery.middleware)
      .concat(checkpointQuery.middleware),
})
