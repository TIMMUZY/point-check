import { createSlice } from '@reduxjs/toolkit'
import { getFormattedDate } from '../../utilits/datePassFunction/getDate'
import {
  clearNumber,
  removeFirstDigitNumber,
} from '../../utilits/phoneFormater/PhoneFormater'

const initialState = {
  isAutoPass: true,
  oneTimePass: true,
  commentPass: '',
  typeTimePass: 'ONETIME',
  startTimePass: getFormattedDate(new Date()),
  endTimePass: getFormattedDate(
    new Date(new Date().setDate(new Date().getDate() + 1)),
  ),
  maxEndTimePass: getFormattedDate(new Date(), true),
  nameVisitor: '',
  tel: '',
  licensePlateCar: '',
  brandCar: '',
  territoryUser: '',
  isClickCreatPass: false,
  filteredCar: { filteredCars: [], filteredPhone: [] },
  filteredVisitor: { filteredVisitors: [], filteredPhone: [] },
  isOpenBrand: false,
  isOpenCar: false,
  isOpenVisitor: false,
  isOpenPhone: false,
  carID: null,
  visitorID: null,
}

const passSlice = createSlice({
  name: 'passReducer',
  initialState,

  reducers: {
    setIsAutoPass: (state, action) => {
      state.isAutoPass = action.payload
    },
    setOneTimePass: (state, action) => {
      state.oneTimePass = action.payload
    },
    setCommentPass: (state, action) => {
      state.commentPass = action.payload
    },
    setTypeTimePass: (state, action) => {
      state.typeTimePass = action.payload ? 'ONETIME' : 'Постоянный'
    },
    setStartTimePass: (state, action) => {
      state.startTimePass = action.payload
    },
    setEndTimePass: (state, action) => {
      state.endTimePass = action.payload
    },
    setNameVisitor: (state, action) => {
      state.nameVisitor = action.payload
    },
    setTel: (state, action) => {
      state.tel = action.payload ? clearNumber(action.payload) : action.payload
    },
    setLicensePlateCar: (state, action) => {
      state.licensePlateCar = action.payload
    },
    setBrandCar: (state, action) => {
      state.brandCar = action.payload
    },
    setTerritoryUser: (state, action) => {
      state.territoryUser = action.payload
    },
    setIsClickCreatPass: (state, action) => {
      state.isClickCreatPass = action.payload
    },

    setFilteredCar: (state, action) => {
      const { carUser, licensePlateCar, tel } = action.payload

      if (carUser) {
        const uniqueCarsUser = [...new Set(carUser.map((obj) => obj.id))].map(
          (id) => carUser.find((obj) => obj.id === id),
        )
        if (licensePlateCar) {
          state.filteredCar.filteredCars = uniqueCarsUser.filter((car) => {
            return car.licensePlate
              .toLowerCase()
              .includes(licensePlateCar.toLowerCase())
          })
        } else {
          state.filteredCar.filteredCars = uniqueCarsUser
        }
        if (tel) {
          state.filteredCar.filteredPhone = uniqueCarsUser.filter((car) => {
            return car.phone?.includes(removeFirstDigitNumber(tel))
          })
        } else {
          state.filteredCar.filteredPhone = uniqueCarsUser
        }
      }
    },

    setFilteredVisitor: (state, action) => {
      const { visitors, nameVisitor, tel } = action.payload

      if (visitors) {
        const uniqueVisitors = [...new Set(visitors.map((obj) => obj.id))].map(
          (id) => visitors.find((obj) => obj.id === id),
        )
        if (nameVisitor) {
          state.filteredVisitor.filteredVisitors = uniqueVisitors.filter(
            (item) => {
              return item.name.toLowerCase().includes(nameVisitor.toLowerCase())
            },
          )
        } else {
          state.filteredVisitor.filteredVisitors = uniqueVisitors
        }

        if (tel) {
          state.filteredVisitor.filteredPhone = uniqueVisitors.filter(
            (item) => {
              return item.phone?.includes(removeFirstDigitNumber(tel))
            },
          )
        } else {
          state.filteredVisitor.filteredPhone = uniqueVisitors
        }
      }
    },
    setIsOpenBrand: (state, action) => {
      state.isOpenBrand = action.payload
    },
    setIsOpenCar: (state, action) => {
      state.isOpenCar = action.payload
    },
    setIsOpenVisitor: (state, action) => {
      state.isOpenVisitor = action.payload
    },
    setIsOpenPhone: (state, action) => {
      state.isOpenPhone = action.payload
    },
    setCarID: (state, action) => {
      state.carID = action.payload
    },
    setVisitorID: (state, action) => {
      state.visitorID = action.payload
    },
  },
})

export const {
  setIsAutoPass,
  setOneTimePass,
  setCommentPass,
  setTypeTimePass,
  setStartTimePass,
  setEndTimePass,
  setNameVisitor,
  setTel,
  setLicensePlateCar,
  setBrandCar,
  setTerritoryUser,
  setIsClickCreatPass,
  setFilteredCar,
  setFilteredVisitor,
  setIsOpenBrand,
  setIsOpenCar,
  setIsOpenVisitor,
  setIsOpenPhone,
  setCarID,
  setVisitorID,
} = passSlice.actions

export default passSlice.reducer
