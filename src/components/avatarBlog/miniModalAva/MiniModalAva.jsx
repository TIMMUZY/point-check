import styles from './MiniModalAva.module.css'

export default function MiniModalAva({ isShowModal, children }) {
  return (
    <div
      className={ `${styles.contentModal} modal ${isShowModal ? styles.active : ''}`}
    >
      {children}
    </div>
  )
}
