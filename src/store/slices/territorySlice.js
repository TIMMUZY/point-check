import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  territoriesAllList: [],
  territoriesUserList: [],
}

const territorySlice = createSlice({
  name: 'territoryReducer',
  initialState,
  reducers: {
    setTerritoriesAllList: (state, action) => {
      state.territoriesAllList = Object.keys(action.payload).map((key) => ({
        id: key,
        ...action.payload[key],
      }))
    },
    setTerritoriesUserList: (state, action) => {
      state.territoriesUserList = Object.keys(action.payload).map((key) => ({
        id: key,
        ...action.payload[key],
      }))
    },
  },
})

export const { setTerritoriesAllList, setTerritoriesUserList } =
  territorySlice.actions

export default territorySlice.reducer
