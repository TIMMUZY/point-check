import styles from './ModalSecurity.module.css'

export default function ModalSecurity({ isShowModal, children }) {
  return (
    <div
      className={`${styles.wrapModal} ${isShowModal ? styles.active : ''}`}
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
