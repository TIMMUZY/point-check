import styles from './Modal.module.css'

export default function Modal({ isShowModal, setIsShowModal, children }) {
  return (
    <div
      className={`${styles.wrapModal} ${isShowModal ? styles.active : ''}`}
      onClick={() => setIsShowModal(false)}
    >
      <div
        className={`${styles.contentModal} ${isShowModal ? styles.active : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
