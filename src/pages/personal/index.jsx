import styles from './Personal.module.css'
import { useState, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BtnText from '../../components/UI/btnText/BtnText'
import stylesBtnText from '../../components/UI/btnText/BtnText.module.css'
import BtnIcon from '../../components/UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../components/UI/btnIcon/BtnIcon.module.css'
import { PersonalContact } from '../../components/personalContact/PersonalContact'
import { AvatarBlog } from '../../components/avatarBlog/AvatarBlog'
import EditPersonal from '../../components/editPersonal/EditPersonal'
import { Arrow } from '../../utilits/icon/arrow'
import UserContext from '../../components/context/UserContext'
import { setAvatarUrl } from '../../store/slices/avatarSlice'
import { clearNumber } from '../../utilits/phoneFormater/PhoneFormater'
import { changeUserApi } from '../../components/API/ChangUser'
import TerritoriesUser from '../../components/territoriesUser'

export default function PersonalPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState(false)
  const [fullNameChanged, setFullNameChanged] = useState(false)
  const [numberForSentChanged, setNumberForSentChanged] = useState(false)
  const [error, setError] = useState(null)
  const [offButton, setOffButton] = useState(false)
  const user = JSON.parse(sessionStorage?.getItem('user'))
  const [mainNumber, setMainNumber] = useState(
    user.mainNumber ? user.mainNumber : '',
  )
  const [fullName, setFullName] = useState(user.fullName)
  const [errorsForm, setErrorsForm] = useState({
    mainNumber: '',
    fullName: '',
  })

  const { setUser } = useContext(UserContext)

  const id = user.id

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const updateUserFields = (updatedFields) => {
    const currentUser = { ...user }
    const updatedUser = {
      ...currentUser,
      ...updatedFields,
    }
    setUser(updatedUser)
    sessionStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const validateForm = (numberForSent) => {
    let isValid = true
    const newErrors = { ...errorsForm }
    const fullNamePattern = /^(?:[А-ЯA-Z][а-яa-z]*)(?:\\s+[А-ЯA-Z][а-яa-z]*)*/
    if (numberForSent) {
      const mainNumberPattern =
        /^([+]?[\\s0-9]+)?(\\d{3}|[(]?[0-9]+[)])?([-]?[\\s]?[0-9])+$/
      if (
        numberForSent?.trim() !== '' &&
        !mainNumberPattern.test(numberForSent)
      ) {
        newErrors.mainNumber = 'Введите корректный номер телефона'
        isValid = false
      } else {
        newErrors.mainNumber = ''
      }
    }

    if (fullName.trim() === '') {
      newErrors.fullName = 'Введите ФИО'
      isValid = false
    } else if (!fullNamePattern.test(fullName)) {
      newErrors.fullName =
        'Имя должно начинаться с заглавной буквы и содержать только латинские или кириллические буквы'
      isValid = false
    } else if (fullName.length < 2) {
      newErrors.fullName = 'Имя должно быть не менее двух символов'
      isValid = false
    } else if (fullName.length > 100) {
      newErrors.fullName = 'Имя должено быть короче ста символов'
      isValid = false
    } else {
      newErrors.fullName = ''
    }

    setErrorsForm(newErrors)
    setFullNameChanged(false)
    setNumberForSentChanged(false)
    return isValid
  }

  const handleSaveChange = async () => {
    const numberForSent = clearNumber(mainNumber)
    if (validateForm(numberForSent)) {
      try {
        await changeUserApi(id, fullName, numberForSent)
        setOffButton(true)
        updateUserFields({ fullName: fullName, mainNumber: numberForSent })
        setIsEdit(!isEdit)
      } catch (currentError) {
        setError(currentError.message)
      } finally {
        setOffButton(false)
      }
    }
  }

  const handleLogout = () => {
    setUser(null)
    sessionStorage.clear()
    dispatch(setAvatarUrl(''))
  }

  return (
    <main className={styles.main}>
      <div className={styles.contentWrap}>
        <div className={styles.titlePerson}>
          <BtnIcon
            classes={[
              stylesBtnIcon.btnIconMedium,
              stylesBtnIcon.colorSecondary,
            ]}
            onClick={() => navigate('/')}
            icon={<Arrow />}
          />
          <h1 className={styles.titleText}>Профиль</h1>
        </div>
        <div className={styles.bodyPerson}>
          <AvatarBlog
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setFullNameChanged={setFullNameChanged}
            setNumberForSentChanged={setNumberForSentChanged}
            numberForSentChanged={numberForSentChanged}
            handleSaveChange={handleSaveChange}
            fullNameChanged={fullNameChanged}
            offButton={offButton}
            user={user}
          />
          {!isEdit ? (
            <>
              <PersonalContact user={user} />
              {user.role !== 'ADMIN' && <TerritoriesUser id={id} />}
              <BtnText
                classes={[
                  stylesBtnText.btnTextBig,
                  stylesBtnText.colorActiveInDark,
                  stylesBtnText.width100,
                ]}
                onClick={handleLogout}
              >
                Выйти из аккаунта
              </BtnText>
            </>
          ) : (
            <EditPersonal
              fullName={fullName}
              setFullName={setFullName}
              setFullNameChanged={setFullNameChanged}
              mainNumber={mainNumber}
              setNumberForSentChanged={setNumberForSentChanged}
              setMainNumber={setMainNumber}
              error={error}
              setError={setError}
              errorsForm={errorsForm}
              setErrorsForm={setErrorsForm}
            />
          )}
        </div>
      </div>
    </main>
  )
}
