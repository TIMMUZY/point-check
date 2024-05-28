import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterUsersByBlocking: 'Все пользователи',
}

const filterUsersSlice = createSlice({
  name: 'filterUsers',
  initialState,
  reducers: {
    setFilterUsersByBlocking: (state, action) => {
      state.filterUsersByBlocking = action.payload
    },
  },
})

export const { setFilterUsersByBlocking } = filterUsersSlice.actions

export default filterUsersSlice.reducer
