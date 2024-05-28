import styles from './AddPhotoTerritory.module.css'
import { useState, useEffect } from 'react'
import BtnIcon from '../../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../UI/btnIcon/BtnIcon.module.css'
import { Delete } from '../../../utilits/icon/delete'
import { AddPhoto } from '../../../utilits/icon/addPhoto'
import { getTerritoryAvatarApi } from '../../API/AvatarApi'
import { 
  handleAddPhoto, handleDeleteImage, 
  handleDropPhoto, onImgLoad 
} from '../../../utilits/helpers'

export default function EditPhotoTerritory({ id, setFile, setImgDims, setError, isError }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [oldAvatarUrl, setOldAvatarUrl] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const responseGet = await getTerritoryAvatarApi(id)
        if (responseGet) {
          const blob = await responseGet.blob()
          setOldAvatarUrl(URL.createObjectURL(blob))
          sessionStorage.setItem('isPhoto', true)
        }
      } catch (currentError) {
        console.log(currentError)
      }
    }

    fetchAvatar()
  }, [])

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(true);
    }
  }

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }

  const handleDrop = (e) => {
    setIsDragOver(false)
    handleDropPhoto(e, setFile, setSelectedImage, setError)
  }

  return (
    <>
      <div 
        className={`
          ${styles.forImage} 
          ${isDragOver ? styles.dragOver : ''} 
          ${isError ? styles.error : ''}
        `}
        onClick={() => handleAddPhoto(setFile, setSelectedImage, setError, setOldAvatarUrl)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <AddPhoto />
        <p>
          Перетащите сюда фото <br /> 
          или нажмите для загрузки. <br /> <br />
          Расширения - jpg, jpeg, png, ico, gif, eps, svg, bmp. <br />
          Допустимый размер - до 5 Мб. <br />
          Максимальная ширина/высота: до 400х400. <br />
        </p>
      </div>
      {(selectedImage || oldAvatarUrl) && (
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={selectedImage ? selectedImage : oldAvatarUrl}
              alt="Image"
              onLoad={() => onImgLoad(selectedImage, setImgDims)}
            />
            <div className={styles.deleteButtonContainer}>
              <BtnIcon
                classes={[
                  stylesBtnIcon.btnIconMedium,
                  stylesBtnIcon.circle,
                  stylesBtnIcon.colorWhite,
                ]}
                icon={<Delete />}
                onClick={() => handleDeleteImage(setFile, setSelectedImage, setOldAvatarUrl)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
