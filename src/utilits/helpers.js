import styles from '../components/formAddPass/FormAddPass.module.css'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { getFormattedDate } from './datePassFunction/getDate'
import {
  setLicensePlateCar,
  setBrandCar,
  setNameVisitor,
} from '../store/slices/passSlice'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const getTextButton = (isLoading, isEdit) => {
  if (!isLoading) {
    if (isEdit) {
      return 'Сохранить изменения'
    }
    if (!isEdit) {
      return 'Создать пропуск'
    }
  } else {
    return <ClipLoader size={18} color="#fff" />
  }
}

const createPass = (handlePassData, dispatch, setIsClickCreatPass, pass) => {
  dispatch(setIsClickCreatPass(false))

  if (
    (pass?.isAutoPass
      ? !pass?.licensePlateCar || !pass?.brandCar
      : !pass?.nameVisitor) ||
    !pass?.tel ||
    !pass?.startTimePass ||
    !pass?.endTimePass
  ) {
    dispatch(setIsClickCreatPass(true))
    toast('Заполните обязательные поля!', { className: styles.error })
  } else if (pass?.tel?.length < 11 && pass?.tel) {
    dispatch(setIsClickCreatPass(true))
  } else if (
    pass?.startTimePass > pass?.endTimePass ||
    pass?.endTimePass < getFormattedDate(new Date()) ||
    pass?.endTimePass > pass?.maxEndTimePass
  ) {
    dispatch(setIsClickCreatPass(true))
  } else {
    handlePassData()
  }
}

const handleChangeValidation = (e, dispatch, name) => {
  const newValue = e.target.value

  const regexLicensePlateCar = /^[АВЕКМНОРСТУХавекмнорстухA-Za-z0-9]+$/ // Регулярное выражение для цифр, латинских и русских букв
  const regexBrandCar = /^[a-zA-Z][a-zA-Z -]*$/ // Регулярное выражение для латинских букв и пробелов
  const regexNameVisitor = /^[\u0400-\u04FFa-zA-Z][\u0400-\u04FFa-zA-Z -]*$/ // Регулярное выражение для латинских и русских букв, пробелов, дефисов

  if (
    name === 'ГосНомер' &&
    ((regexLicensePlateCar?.test(newValue) && newValue?.length <= 10) ||
      newValue?.length === 0)
  ) {
    dispatch(setLicensePlateCar(newValue))
  }

  if (
    name === 'МаркаМашины' &&
    (regexBrandCar?.test(newValue) || newValue?.length === 0)
  ) {
    dispatch(setBrandCar(newValue))
  }

  if (
    name === 'Пешеход' &&
    ((regexNameVisitor?.test(newValue) && newValue?.length < 31) ||
      newValue?.length === 0)
  ) {
    dispatch(setNameVisitor(newValue))
  }
}

const validatePhoto = (file, imgDims) => {
  if (!file) return

  const allowedPhotoFormats = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/vnd.microsoft.icon',
    'image/svg+xml', // EPS тоже должен быть тут, .но какой формат?
  ]

  if (!allowedPhotoFormats.includes(file['type'])) {
    throw new Error(
      'Допустимые расширения изображения: jpg, jpeg, png, ico, gif, eps, svg, bmp',
    )
  } else if (file.size >= 5e6) {
    throw new Error('Максимальный размер изображения - 5 Мб')
  } else if (imgDims.w >= 400 || imgDims.h >= 400) {
    throw new Error('Максимальная ширина и высота изображения - 400x400')
  }
}

const handleAddPhoto = (
  setFile,
  setSelectedImage,
  setError,
  setOldAvatarUrl,
) => {
  const input = document.createElement('input')
  input.type = 'file'

  input.onchange = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = (readerEvent) => {
        const imageDataUrl = readerEvent.target.result
        setFile(file)
        setSelectedImage(imageDataUrl)
        setError(null)

        if (setOldAvatarUrl) {
          setOldAvatarUrl(null)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  input.click()
}

const handleDeleteImage = (setFile, setSelectedImage, setOldAvatarUrl) => {
  setFile(null)
  setSelectedImage(null)
  if (setOldAvatarUrl) {
    setOldAvatarUrl(null)
  }
}

const handleDropPhoto = (event, setFile, setSelectedImage, setError) => {
  event.preventDefault()
  const file = event.dataTransfer.files[0]

  if (file && file['type'].includes('image')) {
    const imageDataUrl = URL.createObjectURL(file)
    setFile(file)
    setSelectedImage(imageDataUrl)
    setError(null)
  }
}

function onImgLoad(imgUrl, setImgDims) {
  const img = new Image()

  img.onload = () => {
    setImgDims({ w: img.width, h: img.height })
  }

  img.src = imgUrl
}

const debounce = (callee, timeoutMs) => {
  let timer

  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callee.apply(this, args)
    }, timeoutMs)
  }
}

const emailPattern = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,3}$/i)

const handleDateErrors = (pass) => {
  const dateErrors = []

  if (
    pass?.startTimePass > pass?.endTimePass ||
    pass?.endTimePass < getFormattedDate(new Date())
  ) {
    dateErrors.push(
      pass?.startTimePass > pass?.endTimePass
        ? 'Дата начала не должна быть позже конечной даты!'
        : 'Конечная дата не должна быть раньше текущей даты!',
    )
  }

  if (pass?.endTimePass > pass?.maxEndTimePass) {
    dateErrors.push(
      'Слишком длинный период. Конечная дата не должна превышать ' +
        format(new Date(pass?.maxEndTimePass), 'dd.MM.yyyy', {
          locale: ru,
        }) +
        'г.',
    )
  }

  return dateErrors.map((error, index) => (
    <p key={index} className={styles.textError}>
      {error}
    </p>
  ))
}

const handleKeyDown = (keyboardEvent, handleFunction) => {
  if (keyboardEvent?.key === 'Enter') {
    handleFunction()
  }
}

export {
  getTextButton,
  createPass,
  handleChangeValidation,
  debounce,
  handleAddPhoto,
  handleDeleteImage,
  handleDropPhoto,
  emailPattern,
  validatePhoto,
  onImgLoad,
  handleDateErrors,
  handleKeyDown,
}
