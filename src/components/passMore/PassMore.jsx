import styles from './PassMore.module.css'
import { useState } from 'react'
import BtnIcon from '../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../UI/btnIcon/BtnIcon.module.css'
import ButtonBlog from './buttonBlog/ButtonBlog'
import { Close } from '../../utilits/icon/close'
import { Tabs } from './tabsBlog/tabs/Tabs'
import { TabContent1, TabContent2 } from './tabsBlog/content/TabsContent'
import { TabContent3 } from './tabsBlog/contentEvents/ContentEvents'
import { useDispatch, useSelector } from 'react-redux'
import { setIsChangePass } from '../../store/slices/changeSlice'
import { isPassChangeSelector } from '../../store/selectors'
import { AvaTerritoryWhite } from '../../utilits/icon/avaTerritory/AvaTerritoryWhite'
import { useEffect } from 'react'
import { getPassById } from '../API/PassAPI'
import { getTerritoryAvatarApi } from '../API/AvatarApi'
import Loader from '../UI/loader/Loader'

export default function PassMore({
  passId,
  setIsShowModal,
  isShowModal,
  ...props
}) {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorPass, setErrorPass] = useState(null)
  const [pass, setPass] = useState(null)
  const [passNumber, setPassNumber] = useState(null)
  const [activeTab, setActiveTab] = useState('О пропуске')
  const [avatarUrl, setAvatarUrl] = useState(null)
  const isPassChange = useSelector(isPassChangeSelector)
  const dispatch = useDispatch()

  const user = JSON.parse(sessionStorage.getItem('user'))

  useEffect(() => {
    async function fetchPass(passId) {
      try {
        setIsLoading(true)
        const res = await getPassById(passId)
        setPass(res)
        if (res) {
          const responseGet = await getTerritoryAvatarApi(res.territory.id)
          if (responseGet) {
            const blob = await responseGet.blob()
            setAvatarUrl(URL.createObjectURL(blob))
          }

        }
      } catch (err) {
        setErrorPass(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (isShowModal) {
      const passNumberRef = passId.slice(-4)
      setPassNumber(passNumberRef)
      console.log(passNumber)
      fetchPass(passId)
    }
  }, [isShowModal])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const tabs = ['О пропуске', 'Кем создан', 'Пересечения']
  const tabContents = {
    'О пропуске': <TabContent1 pass={pass} />,
    'Кем создан': <TabContent2 pass={pass} />,
    'Пересечения': <TabContent3 id={pass?.id} />,
  }
  const handleClose = () => {
    setIsShowModal(false)
    setError(null)
    dispatch(setIsChangePass(!isPassChange))
  }

  return (
    <div {...props} className={styles.wrap}>
      <div className={styles.titleBlog}>
        <h2>Подробнее о пропуске № {passId && passId.slice(-4)}</h2>
        <BtnIcon
          classes={[stylesBtnIcon.btnIconMedium, stylesBtnIcon.colorSecondary]}
          icon={<Close />}
          onClick={handleClose}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {errorPass ? (
            <div className={styles.error}>{errorPass}</div>
          ) : (
            pass && (
              <div className={styles.content}>
                {user?.id === pass?.user?.id && (
                  <ButtonBlog
                    pass={pass}
                    setIsShowModal={setIsShowModal}
                    error={error}
                    setError={setError}
                  />
                )}
                <div className={styles.territoryBlog}>
                  <div className={styles.itemImageWrapper}>
                    {avatarUrl ? (
                      <img
                        className={styles.itemImage}
                        src={avatarUrl}
                        alt="avatarTerrytory"
                      />
                    ) : (
                      <AvaTerritoryWhite />
                    )}
                  </div>
                  <div className={styles.territoryInfo}>
                    <p className={styles.itemCity}>Санкт-Петербург</p>
                    <p className={styles.itemName}>{pass?.territory?.name}</p>
                    <p className={styles.itemAddress}>
                      Московский пр-т 183-185
                    </p>
                  </div>
                </div>

                <Tabs
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabClick={handleTabClick}
                />
                {tabContents[activeTab]}
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
