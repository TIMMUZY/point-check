import styles from './ModalEditNote.module.css'
import { useEffect, useState } from 'react'
import InputArea from '../../UI/inputArea/InputArea'
import BtnIcon from '../../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../../components/UI/btnIcon/BtnIcon.module.css'
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../../components/UI/btnText/BtnText.module.css'
import { ArrowRight } from '../../../utilits/icon/arrowRight'
import { Document } from '../../../utilits/icon/document'
import { Close } from '../../../utilits/icon/close'

export default function ModalEditNote({
  isShowModalEditNote,
  setIsShowModal,
  territoryNote,
  handleEditNote,
  setTerritoryNote,
  ...props
}) {
  const [note, setNote] = useState('')

  useEffect(() => {
    setNote(territoryNote)
  }, [territoryNote, isShowModalEditNote])

  const handleEdit = async () => {
    await handleEditNote(note)
    setTerritoryNote(note)
    setIsShowModal(false)
  }

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.header}>
        <h2 className={styles.title}>Изменить примечание</h2>
        <BtnIcon
          classes={[stylesBtnIcon.btnIconMedium, stylesBtnIcon.colorSecondary]}
          icon={<Close />}
          onClick={() => setIsShowModal(false)}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.search}>
          <InputArea
            icon={<Document />}
            value={note}
            placeholder={'Введите примечание для объекта'}
            name={'territoryNote'}
            maxLength={200}
            onChange={(event) => {
              setNote(event.target.value)
            }}
          />
          <BtnText
            classes={[stylesBtnText.btnTextBig, stylesBtnText.colorSecondary]}
            iconRight={<ArrowRight />}
            onClick={handleEdit}
          >
            Подтвердить
          </BtnText>
        </div>
      </div>
    </div>
  )
}
