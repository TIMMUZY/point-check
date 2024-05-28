import styles from './AddPass.module.css'
import stylesBtnIcon from '../../components/UI/btnIcon/BtnIcon.module.css'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BtnIcon from '../../components/UI/btnIcon/BtnIcon'
import { Close } from '../../utilits/icon/close'
import FormAddPass from '../../components/formAddPass/FormAddPass'
import {
  setIsOpenBrand,
  setIsOpenCar,
  setIsOpenVisitor,
  setIsOpenPhone,
} from '../../store/slices/passSlice'
import {
  clearFormPass,
  fillOutFormDataCreatedPass,
} from '../../utilits/changeKindPass/changeKindPass'
import { useGetPassQuery } from '../../store/RTKQuery/pass'
import Loader from '../../components/UI/loader/Loader'

export default function AddPassPage({ isEdit = false, isRepeat = false }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { data: passInfo = {}, isLoading: isLoadingPass } =
    (isEdit || isRepeat) && useGetPassQuery(id)

  const toggleOpenBrand = () => {
    dispatch(setIsOpenBrand(false))
    dispatch(setIsOpenCar(false))
    dispatch(setIsOpenVisitor(false))
    dispatch(setIsOpenPhone(false))
  }

  useEffect(() => {
    if (passInfo && (isEdit || isRepeat)) {
      fillOutFormDataCreatedPass(dispatch, passInfo, isEdit)
    }
  }, [passInfo])

  return (
    <main className={styles.main} onClick={toggleOpenBrand}>
      <div className={styles.pass}>
        <div className={styles.passHead}>
          <h2>{isEdit ? 'Изменить пропуск' : 'Добавить пропуск'}</h2>
          <BtnIcon
            classes={[
              stylesBtnIcon.btnIconMedium,
              stylesBtnIcon.colorSecondary,
            ]}
            icon={<Close />}
            onClick={() => {
              navigate('/'), clearFormPass(dispatch)
            }}
          />
        </div>

        {isLoadingPass && (isEdit || isRepeat) ? (
          <Loader />
        ) : (
          <FormAddPass isEdit={isEdit} isRepeat={isRepeat} id={id} />
        )}
      </div>
    </main>
  )
}
