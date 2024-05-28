import styles from './ModalAddPost.module.css'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import BtnIcon from '../../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../../components/UI/btnIcon/BtnIcon.module.css'
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../../components/UI/btnText/BtnText.module.css'
import InputIcon from '../../UI/inputIcon/InputIcon'
import stylesInputIcon from '../../../components/UI/inputIcon/InputIcon.module.css'
import { addPost, changePost } from '../../API/PostApi'
import { Document } from '../../../utilits/icon/document'
import { Profile } from '../../../utilits/icon/profile'
import { Archway } from '../../../utilits/icon/archway'
import { Close } from '../../../utilits/icon/close'
import { Tick } from '../../../utilits/icon/tick'
import { Car } from '../../../utilits/icon/car'
import { handleKeyDown } from '../../../utilits/helpers'

export default function ModalAddPost({
  setIsShowModal,
  isShowModal,
  territoryId,
  fetchPosts,
  newSessionStoragePost,
  edit,
  ...props
}) {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('UNIVERSAL')
  const [note, setNote] = useState('')

  const [errorsForm, setErrorsForm] = useState({
    name: '',
    note: '',
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

    if (note.length > 200) {
      newErrors.note = 'Заметка должна быть короче двухсот символов'
      isValid = false
    } else {
      newErrors.note = ''
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
    newErrors.note = ''
    setErrorsForm(newErrors)
  }, [note])

  useEffect(() => {
    if (edit && sessionStorage.getItem('editPost')) {
      const post = JSON.parse(sessionStorage.getItem('editPost'))
      setId(post.id)
      setName(post.name)
      setType(post.type)
      setNote(post.note)
    }
  }, [newSessionStoragePost])

  async function handleAddPost() {
    if (validateForm()) {
      try {
        const response = await addPost(name, type, note, territoryId)
        await fetchPosts(territoryId)
        setIsShowModal(false)
        setName('')
        setType('UNIVERSAL')
        setNote('')
        if (response?.status < 400) {
          toast.success('Пост охраны добавлен!')
        }
      } catch (error) {
        toast.error(error.message, { className: styles.error })
      }
    }
  }

  async function handleEditPost() {
    if (validateForm()) {
      try {
        const response = await changePost(id, name, type, note, territoryId)
        await fetchPosts(territoryId)
        setIsShowModal(false)
        setId('')
        setName('')
        setType('UNIVERSAL')
        setNote('')
        if (response?.status < 400) {
          toast.success('Пост охраны изменён!')
        }
      } catch (error) {
        toast.error(error.message, { className: styles.error })
      }
    }
  }

  const getBtnTextClasses = (typeActive) => {
    const commonClasses = [
      stylesBtnText.btnTextTypePost,
      stylesBtnText.width100,
    ]
    if (typeActive === type) {
      return [...commonClasses, stylesBtnText.colorActive]
    } else {
      return [...commonClasses, stylesBtnText.colorGhost]
    }
  }

  useEffect(() => {
    setName('')
    setNote('')
  }, [isShowModal])

  const handlePost = () => {
    edit ? handleEditPost() : handleAddPost()
  }

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {edit ? 'Изменить пост охраны' : 'Добавить пост охраны'}
        </h2>
        <BtnIcon
          classes={[stylesBtnIcon.btnIconMedium, stylesBtnIcon.colorSecondary]}
          icon={<Close />}
          onClick={() => setIsShowModal(false)}
        />
      </div>
      <form
        className={styles.container}
        onKeyDown={(event) => handleKeyDown(event, handlePost)}
      >
        <div>
          <InputIcon
            icon={<Archway />}
            value={name}
            placeholder={'Название поста охраны'}
            name={'postName'}
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
            icon={<Document />}
            value={note}
            placeholder={'Заметка для поста охраны'}
            name={'postNote'}
            maxLength={200}
            classes={
              errorsForm.note ? [stylesInputIcon.colorNegativeInput] : []
            }
            onChange={(event) => {
              setNote(event.target.value)
            }}
            setValue={setNote}
          />
          {errorsForm.note && <div className="error">{errorsForm.note}</div>}
        </div>
        <div className={styles.typeWrapper}>
          <p className={styles.text}>Тип пропуска</p>
          <div className={styles.typeInner}>
            <BtnText
              icon={<Profile />}
              classes={getBtnTextClasses('WALK')}
              onClick={() => setType('WALK')}
            >
              Пешеходный
            </BtnText>
            <BtnText
              icon={<Car />}
              classes={getBtnTextClasses('AUTO')}
              onClick={() => setType('AUTO')}
            >
              Автомобильный
            </BtnText>
            <BtnText
              icon={<Tick />}
              classes={getBtnTextClasses('UNIVERSAL')}
              onClick={() => setType('UNIVERSAL')}
            >
              Универсальный
            </BtnText>
          </div>
        </div>
        <BtnText
          classes={[
            stylesBtnText.btnTextBig,
            stylesBtnText.colorPrimary,
            stylesBtnText.width100,
          ]}
          onClick={edit ? handleEditPost : handleAddPost}
        >
          {edit ? 'Сохранить изменения' : 'Добавить пост охраны'}
        </BtnText>
      </form>
    </div>
  )
}
