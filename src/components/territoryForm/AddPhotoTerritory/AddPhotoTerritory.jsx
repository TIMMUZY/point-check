import styles from './AddPhotoTerritory.module.css'
import { useState } from 'react'
import BtnIcon from '../../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../UI/btnIcon/BtnIcon.module.css'
import { Delete } from '../../../utilits/icon/delete'
import { AddPhoto } from '../../../utilits/icon/addPhoto'
import { 
  handleAddPhoto, handleDropPhoto,
  handleDeleteImage, onImgLoad
} from "../../../utilits/helpers";

export default function AddPhotoTerritory({ setFile, setImgDims, setError, isError }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)

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
        onClick={() => handleAddPhoto(setFile, setSelectedImage, setError)}
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
      {selectedImage && (
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src={selectedImage}
              alt="selectedImage"
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
                onClick={() => handleDeleteImage(setFile, setSelectedImage)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
