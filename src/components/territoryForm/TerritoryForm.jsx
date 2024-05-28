import styles from './TerritoryForm.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import AddPhotoTerritory from './AddPhotoTerritory/AddPhotoTerritory'
import EditPhotoTerritory from './AddPhotoTerritory/EditPhotoTerritory'
import BtnText from '../UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import InputIcon from '../UI/inputIcon/InputIcon'
import stylesInputIcon from '../../components/UI/inputIcon/InputIcon.module.css'
import { Location } from '../../utilits/icon/location'
import { Home } from '../../utilits/icon/home'
import { Shop } from '../../utilits/icon/shop'
import { addTerritory, editTerritory } from '../API/TerritoryApi'
import {
  addTerritoryAvatarApi,
  // delTerritoryAvatarApi,
} from '../API/AvatarApi'
import { validatePhoto, handleKeyDown } from '../../utilits/helpers'

export default function TerritoryForm({ edit, id }) {
  const [error, setError] = useState(null)
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [file, setFile] = useState(null)
  const [imgDims, setImgDims] = useState({ w: undefined, h: undefined })
  const [isLoading, setLoading] = useState(false)

  const navigate = useNavigate()
  const territory = JSON.parse(sessionStorage?.getItem('editTerritory'))
  // const isPhoto = sessionStorage.getItem('isPhoto')
  const [errorsForm, setErrorsForm] = useState({
    name: '',
    city: '',
    address: '',
  })

  const mustContainOneLetter = /.*[a-zA-Zа-яА-Я].*/

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errorsForm }

    if (name.trim() === '') {
      newErrors.name = 'Поле не должно быть пустым'
      isValid = false
    } else if (name.length < 2) {
      newErrors.name = 'Название должно быть не менее двух символов'
      isValid = false
    } else if (!mustContainOneLetter.test(name)) {
      newErrors.name = 'В названии должна быть хотя бы одна буква'
      isValid = false
    } else if (name.length > 60) {
      newErrors.name = 'Название должно быть короче шестидесяти символов'
      isValid = false
    } else {
      newErrors.name = ''
    }

    if (city.trim() === '') {
      newErrors.city = 'Поле не должно быть пустым'
      isValid = false
    } else if (city.length < 2) {
      newErrors.city = 'Название города должно быть не менее двух символов'
      isValid = false
    } else if (city.length > 30) {
      newErrors.city = 'Название города должно быть короче тридцати символов'
      isValid = false
    } else {
      newErrors.city = ''
    }

    if (address.trim() === '') {
      newErrors.address = 'Поле не должно быть пустым'
      isValid = false
    } else if (address.length < 2) {
      newErrors.address = 'Адрес должен быть не менее двух символов'
      isValid = false
    } else if (address.length > 60) {
      newErrors.address = 'Адрес должен быть короче шестидесяти символов'
      isValid = false
    } else {
      newErrors.address = ''
    }

    setErrorsForm(newErrors)

    return isValid
  }

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.name = ''
    setErrorsForm(newErrors)
  }, [name])

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.city = ''
    setErrorsForm(newErrors)
  }, [city])

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.address = ''
    setErrorsForm(newErrors)
  }, [address])

  useEffect(() => {
    setError(null)
  }, [name, city, address])

  useEffect(() => {
    if (edit) {
      setName(territory.name)
      setCity(territory.city)
      setAddress(territory.address)
      setNote(territory.note)
    }
  }, [])

  const handleAddTerritory = async () => {
    if (validateForm()) {
      setLoading(true)
      setError(null)

      try {
        if (edit) {
          validatePhoto(file, imgDims)

          const response = await editTerritory(id, name, city, address, note)
          if (response && file) {
            const formData = new FormData()
            formData.append('avatarFile', file)
            await addTerritoryAvatarApi({
              formData,
              id: id,
            })
          }
          // if (!file && isPhoto) {
          //   await delTerritoryAvatarApi(id)
          // }
          navigate(`/territory/${id}`)
          sessionStorage.removeItem('editTerritory')
        } else {
          validatePhoto(file, imgDims)

          const response = await addTerritory(name, city, address)
          if (response?.id && file) {
            const formData = new FormData()
            formData.append('avatarFile', file)
            await addTerritoryAvatarApi({
              formData,
              id: response.id,
            })
          }
          navigate(`/territory/${response.id}`)
        }
      } catch (currentError) {
        setError(currentError.message)
      }

      setLoading(false)
    }
  }

  return (
    <div className={styles.territoryBody}>
      <form
        action=""
        className={styles.form}
        onKeyDown={(event) => handleKeyDown(event, handleAddTerritory)}
      >
        <div>
          <InputIcon
            icon={<Home />}
            value={name}
            placeholder={'Название объекта'}
            name={'territoryName'}
            maxLength={60}
            classes={
              errorsForm.name ? [stylesInputIcon.colorNegativeInput] : []
            }
            onChange={(event) => {
              setName(event.target.value)
            }}
            setValue={setName}
          />
          {errorsForm.name && <div className="error">{errorsForm.name}</div>}
        </div>
        <div>
          <InputIcon
            icon={<Location />}
            value={city}
            placeholder={'Город'}
            name={'territoryCity'}
            maxLength={30}
            classes={
              errorsForm.city ? [stylesInputIcon.colorNegativeInput] : []
            }
            onChange={(event) => {
              setCity(event.target.value)
            }}
            setValue={setCity}
          />
          {errorsForm.city && <div className="error">{errorsForm.city}</div>}
        </div>
        <div>
          <InputIcon
            icon={<Shop />}
            value={address}
            placeholder={'Адрес объекта'}
            name={'territoryAddress'}
            maxLength={60}
            classes={
              errorsForm.address ? [stylesInputIcon.colorNegativeInput] : []
            }
            onChange={(event) => {
              setAddress(event.target.value)
            }}
            setValue={setAddress}
          />
          {errorsForm.address && (
            <div className="error">{errorsForm.address}</div>
          )}
        </div>
        {edit ? (
          <EditPhotoTerritory
            id={territory.id}
            setFile={setFile}
            setImgDims={setImgDims}
            setError={setError}
            isError={error !== null}
          />
        ) : (
          <AddPhotoTerritory
            setFile={setFile}
            setImgDims={setImgDims}
            setError={setError}
            isError={error !== null}
          />
        )}
        {error && <div className="error">{error}</div>}
        <BtnText
          classes={[
            stylesBtnText.btnTextBig,
            stylesBtnText.colorPrimary,
            stylesBtnText.width100,
          ]}
          onClick={handleAddTerritory}
        >
          {isLoading ? (
            <ClipLoader size={18} color="#fff" />
          ) : edit ? (
            'Сохранить изменения'
          ) : (
            'Добавить объект'
          )}
        </BtnText>
      </form>
    </div>
  )
}
