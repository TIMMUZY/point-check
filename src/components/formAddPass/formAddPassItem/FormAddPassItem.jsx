import styles from '../FormAddPass.module.css'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BtnText from '../../UI/btnText/BtnText'
import InputNote from '../../UI/InputNote/InputNote'
import InputTel from '../../UI/inputTel/InputTel'
import InputDate from '../../UI/inputDate/InputDate'
import PassCarItem from './passCarItem/PassCarItem'
import PassNameItem from './passNameItem/PassNameItem'
import { PassOneTime, PassPermanent } from '../../../utilits/icon/passType'
import {
  getTextButton,
  createPass,
  handleDateErrors,
} from '../../../utilits/helpers'
import { clearFormPass } from '../../../utilits/changeKindPass/changeKindPass'
import {
  setOneTimePass,
  setIsClickCreatPass,
  setCommentPass,
  setFilteredCar,
  setFilteredVisitor,
} from '../../../store/slices/passSlice'
import {
  useGetCarUserQuery,
  useGetVisitorUserQuery,
} from '../../../store/RTKQuery/pass'

export default function FormAddPassItem({
  classesTypePassBtnText,
  handlePassData,
  isEdit,
  isLoading,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])
  const { data: carUser } = useGetCarUserQuery(user?.id)
  const { data: visitors } = useGetVisitorUserQuery(user?.id)
  const pass = useSelector((state) => state.pass)

  useEffect(() => {
    if (carUser && pass?.isAutoPass) {
      dispatch(
        setFilteredCar({
          carUser,
          licensePlateCar: pass?.licensePlateCar,
          tel: pass?.tel,
        }),
      )
    }
  }, [carUser, dispatch, pass?.licensePlateCar, pass?.tel, pass?.isAutoPass])

  useEffect(() => {
    if (visitors && !pass?.isAutoPass) {
      dispatch(
        setFilteredVisitor({
          visitors,
          nameVisitor: pass?.nameVisitor,
          tel: pass?.tel,
        }),
      )
    }
  }, [visitors, dispatch, pass?.nameVisitor, pass?.tel, pass?.isAutoPass])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      createPass(handlePassData, dispatch, setIsClickCreatPass, pass)
    }
  }

  return (
    <form action="" className={styles.form} onKeyDown={handleKeyDown}>
      {pass?.isAutoPass ? (
        <PassCarItem isEdit={isEdit} />
      ) : (
        <PassNameItem isEdit={isEdit} />
      )}
      <InputTel
        classes={
          pass?.isClickCreatPass && (!pass?.tel || pass?.tel?.length < 11)
            ? [styles.outlineRed]
            : [styles.outlineGrey]
        }
        pass={true}
      />
      {pass?.isClickCreatPass && pass?.tel?.length < 11 && pass?.tel && (
        <p className={styles.textError}>
          Телефон должен содержать не менее 11 символов!
        </p>
      )}
      <InputDate
        classes={
          (pass?.isClickCreatPass &&
            (!pass?.startTimePass || !pass?.endTimePass)) ||
          pass?.startTimePass > pass?.endTimePass ||
          pass?.endTimePass > pass?.maxEndTimePass
            ? [styles.outlineRed]
            : [styles.outlineGrey]
        }
      />
      {handleDateErrors(pass)}

      <InputNote
        classes={[]}
        name={pass?.name}
        value={pass?.commentPass}
        id=""
        placeholder="Название пропуска (Не обязательно)"
        onChange={(e) => {
          if (e.target.value.length < 31) {
            dispatch(setCommentPass(e.target.value))
          }
        }}
        setValue={setCommentPass}
      />

      <div className={styles.typeWrapper}>
        <BtnText
          classes={
            pass?.oneTimePass
              ? classesTypePassBtnText
              : classesTypePassBtnText.slice(0, -1)
          }
          icon={
            <PassOneTime colorIcon={pass?.oneTimePass ? 'white' : '#8A9499'} />
          }
          onClick={() => dispatch(setOneTimePass(true))}
        >
          {' '}
          Разовый
        </BtnText>
        <BtnText
          classes={
            !pass?.oneTimePass
              ? classesTypePassBtnText
              : classesTypePassBtnText.slice(0, -1)
          }
          icon={
            <PassPermanent
              colorIcon={pass?.oneTimePass ? '#8A9499' : 'white'}
            />
          }
          onClick={() => dispatch(setOneTimePass(false))}
        >
          {' '}
          Постоянный
        </BtnText>
      </div>

      <BtnText
        classes={[
          stylesBtnText.btnTextBig,
          stylesBtnText.colorPrimary,
          stylesBtnText.width100,
        ]}
        onClick={() =>
          createPass(handlePassData, dispatch, setIsClickCreatPass, pass)
        }
      >
        {getTextButton(isLoading, isEdit)}
      </BtnText>
      {isEdit && (
        <BtnText
          classes={[
            stylesBtnText.btnTextBig,
            stylesBtnText.colorPrimary,
            stylesBtnText.width100,
          ]}
          onClick={() => {
            clearFormPass(dispatch)
            navigate(-1)
          }}
        >
          Отмена
        </BtnText>
      )}
    </form>
  )
}
