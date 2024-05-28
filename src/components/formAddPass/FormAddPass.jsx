import styles from './FormAddPass.module.css'
import stylesBtnText from '../UI/btnText/BtnText.module.css'
import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BtnText from '../UI/btnText/BtnText'
import { Person } from '../../utilits/icon/person'
import { Car } from '../../utilits/icon/car'
import FormAddPassItem from './formAddPassItem/FormAddPassItem'
import TerritoriesList from './territoriesList/TerritoriesList'
import {
  handlePersonPass,
  handleCarPass,
} from '../../utilits/changeKindPass/changeKindPass'
import { clearFormPass } from '../../utilits/changeKindPass/changeKindPass'
import {
  useAddPassMutation,
  useUpdatePassMutation,
} from '../../store/RTKQuery/pass'

export default function FormAddPass({ isEdit, isRepeat, id }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const arrClassesBtnText = [
    stylesBtnText.btnTextMedium,
    stylesBtnText.width227,
    stylesBtnText.colorActive,
  ]
  const classesTypePassBtnText = [
    stylesBtnText.btnTextTypePass,
    stylesBtnText.width227,
    stylesBtnText.colorActive,
  ]

  const {
    isAutoPass,
    commentPass,
    startTimePass,
    endTimePass,
    nameVisitor,
    tel,
    licensePlateCar,
    brandCar,
    territoryUser,
    oneTimePass,
    carID,
    visitorID,
  } = useSelector((state) => state.pass)

  const [addPass, { isLoading }] = useAddPassMutation()
  const [updatePass, { isLoading: isLoadingUpdate }] = useUpdatePassMutation()
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  const handlePassData = async () => {
    const mutatePass = isEdit ? updatePass : addPass
    try {
      const response = await mutatePass({
        id: id && id,
        userID: user.id,
        isAutoPass,
        commentPass,
        typeTimePass: oneTimePass ? 'ONETIME' : 'PERMANENT',
        startTimePass,
        endTimePass,
        nameVisitor,
        tel,
        licensePlateCar,
        brandCar,
        territoryID: territoryUser.id,
        carID,
        visitorID,
      })

      if (response.error?.data?.status === 400) {
        toast.error(
          'Неуспешная валидация полей! У пользователя найден накладывающийся пропуск!',
          { className: styles.error },
        )
        return
      }

      if (response.error?.data?.status === 500) {
        toast.error('Ошибка сервера!', { className: styles.error })
        return
      }

      if (!isLoading && !isEdit) {
        toast.success('Пропуск создан!')
      }

      if (!isLoadingUpdate && isEdit) {
        toast.success('Пропуск изменен!')
      }
      if (!isLoadingUpdate && isEdit) {
        navigate(-1)
      }

      if (!isLoading && !isEdit) {
        navigate('/')
      }

      clearFormPass(dispatch)
    } catch (error) {
      toast.error(error.message, { className: styles.error })
    }
  }

  return (
    <div className={styles.passBody}>
      <TerritoriesList isEdit={isEdit} />
      {!isEdit && (
        <div className={styles.typeWrapper}>
          {((isRepeat && !isAutoPass) || !isRepeat) && (
            <BtnText
              classes={
                !isAutoPass ? arrClassesBtnText : arrClassesBtnText.slice(0, -1)
              }
              icon={<Person />}
              onClick={() => handlePersonPass(dispatch)}
            >
              {' '}
              Для пешехода
            </BtnText>
          )}

          {((isRepeat && isAutoPass) || !isRepeat) && (
            <BtnText
              classes={
                isAutoPass ? arrClassesBtnText : arrClassesBtnText.slice(0, -1)
              }
              icon={<Car />}
              onClick={() => handleCarPass(dispatch)}
            >
              {' '}
              Для автомобиля
            </BtnText>
          )}
        </div>
      )}
      <FormAddPassItem
        classesTypePassBtnText={classesTypePassBtnText}
        handlePassData={handlePassData}
        isEdit={isEdit}
        isLoading={isEdit ? isLoadingUpdate : isLoading}
      />
    </div>
  )
}
