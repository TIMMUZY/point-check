import styles from './ModalAddUser.module.css'
import { useEffect, useState } from 'react'
import UserItem from './userItem/UserItem'
import BtnIcon from '../../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../../components/UI/btnIcon/BtnIcon.module.css'
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../../components/UI/btnText/BtnText.module.css'
import InputIcon from '../../UI/inputIcon/InputIcon'
import stylesInputIcon from '../../../components/UI/inputIcon/InputIcon.module.css'
import { ArrowRight } from '../../../utilits/icon/arrowRight'
import { Close } from '../../../utilits/icon/close'
import { Mail } from '../../../utilits/icon/mail'
import { getUserEmail } from '../../API/ActionUserToTerritory'
import { emailPattern, handleKeyDown } from '../../../utilits/helpers'

export default function ModalAddUser({
  setIsShowModal,
  isShowModal,
  territoryId,
  setNeedFetchUsers,
  allPersonList,
  ...props
}) {
  const [error, setError] = useState(null)
  const [users, setUser] = useState([])
  const [searchEmail, setSearchEmail] = useState('')

  const [errorsForm, setErrorsForm] = useState({
    email: '',
  })

  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errorsForm }

    // Проверка наличия имени пользователя
    if (searchEmail.trim() === '') {
      newErrors.email = 'Введите почту'
      isValid = false
    } else if (!emailPattern.test(searchEmail)) {
      newErrors.email = 'Введите корректную почту'
      isValid = false
    } else {
      newErrors.email = ''
    }

    setErrorsForm(newErrors)

    return isValid
  }

  async function handleSearchUser() {
    if (validateForm()) {
      try {
        const newUser = await getUserEmail(searchEmail)
        setError(null)
        if (!users.some((elem) => elem.email === newUser.email)) {
          setUser([...users, newUser])
        }
        setSearchEmail('')
      } catch (error) {
        setError(error.message)
      }
    }
  }

  useEffect(() => {
    const newErrors = { ...errorsForm }
    newErrors.email = ''
    setErrorsForm(newErrors)
  }, [searchEmail])

  useEffect(() => {
    setUser([])
    setSearchEmail('')
  }, [isShowModal])

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.header}>
        <h2 className={styles.title}>Добавить пользователя</h2>
        <BtnIcon
          classes={[stylesBtnIcon.btnIconMedium, stylesBtnIcon.colorSecondary]}
          icon={<Close />}
          onClick={() => setIsShowModal(false)}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.search}>
          <div className={styles.searchInput}>
            <InputIcon
              icon={<Mail />}
              value={searchEmail}
              placeholder={'Введите E-mail пользователя'}
              type={'email'}
              name={'userEmail'}
              classes={
                errorsForm.email ? [stylesInputIcon.colorNegativeInput] : []
              }
              onChange={(event) => {
                setSearchEmail(event.target.value)
              }}
              setValue={setSearchEmail}
              onKeyDown={(event) => handleKeyDown(event, handleSearchUser)}
            />
            {errorsForm.email && (
              <div className="error">{errorsForm.email}</div>
            )}
            {error && <div className="error">{error}</div>}
          </div>
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorSecondary]}
            iconRight={<ArrowRight />}
            onClick={handleSearchUser}
          >
            Искать
          </BtnText>
        </div>
        <div className={styles.list}>
          {users.length
            ? users.map((user) => {
                return (
                  <UserItem
                    territoryId={territoryId}
                    setNeedFetchUsers={setNeedFetchUsers}
                    allPersonList={allPersonList}
                    user={user}
                    key={user.id}
                  />
                )
              })
            : null}
        </div>
      </div>
    </div>
  )
}
