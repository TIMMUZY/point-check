import {
  setIsClickCreatPass,
  setIsAutoPass,
  setOneTimePass,
  setCommentPass,
  setStartTimePass,
  setEndTimePass,
  setTel,
  setBrandCar,
  setLicensePlateCar,
  setCarID,
  setVisitorID,
  setNameVisitor,
  setTerritoryUser,
} from '../../store/slices/passSlice'
import { getFormattedDate } from '../datePassFunction/getDate'

export function handlePersonPass(dispatch) {
  dispatch(setIsClickCreatPass(false))
  dispatch(setIsAutoPass(false))
  dispatch(setOneTimePass(true))
  dispatch(setCommentPass(''))
  dispatch(setStartTimePass(getFormattedDate(new Date())))
  dispatch(
    setEndTimePass(
      getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 1))),
    ),
  )
  dispatch(setTel(''))
  dispatch(setBrandCar(''))
  dispatch(setLicensePlateCar(''))
  dispatch(setCarID(''))
}
export function handleCarPass(dispatch) {
  dispatch(setIsClickCreatPass(false))
  dispatch(setIsAutoPass(true))
  dispatch(setOneTimePass(true))
  dispatch(setCommentPass(''))
  dispatch(setStartTimePass(getFormattedDate(new Date())))
  dispatch(
    setEndTimePass(
      getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 1))),
    ),
  )
  dispatch(setTel(''))
  dispatch(setVisitorID(''))
  dispatch(setNameVisitor(''))
}

export function clearFormPass(dispatch) {
  dispatch(setIsClickCreatPass(false))
  dispatch(setIsAutoPass(true))
  dispatch(setOneTimePass(true))
  dispatch(setCommentPass(''))
  dispatch(setStartTimePass(getFormattedDate(new Date())))
  dispatch(
    setEndTimePass(
      getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 1))),
    ),
  )
  dispatch(setTel(''))
  dispatch(setVisitorID(''))
  dispatch(setNameVisitor(''))
  dispatch(setBrandCar(''))
  dispatch(setLicensePlateCar(''))
  dispatch(setCarID(''))
}

export function fillOutFormDataCreatedPass(dispatch, passInfo, isEdit) {
  dispatch(setIsClickCreatPass(false))
  dispatch(setIsAutoPass(passInfo?.car ? true : false))

  if (passInfo?.territory && passInfo?.timeTypeDescription) {
    dispatch(setTerritoryUser(passInfo?.territory))
    dispatch(
      setOneTimePass(
        passInfo?.timeTypeDescription === 'Постоянный' ? false : true,
      ),
    )
  }

  if (passInfo?.comment || passInfo?.visitor?.note) {
    dispatch(
      setCommentPass(
        passInfo?.car ? passInfo?.comment : passInfo?.visitor?.note,
      ),
    )
  }

  if (isEdit && passInfo?.startTime && passInfo?.endTime) {
    dispatch(setStartTimePass(getFormattedDate(new Date(passInfo?.startTime))))
    dispatch(setEndTimePass(getFormattedDate(new Date(passInfo?.endTime))))
  }

  if (passInfo?.car) {
    dispatch(setCarID(passInfo.car.id))
    dispatch(setBrandCar(passInfo.car.brand.brand))
    dispatch(setLicensePlateCar(passInfo.car.licensePlate))
    dispatch(setTel(passInfo.car.phone))
  }

  if (passInfo?.visitor) {
    dispatch(setVisitorID(passInfo.visitor.id))
    dispatch(setNameVisitor(passInfo.visitor.name))
    dispatch(setTel(passInfo.visitor.phone))
  }
}
