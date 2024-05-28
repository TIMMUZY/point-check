import styles from './MiniModal.module.css'

export default function MiniModal({ isShowModal, role, children }) {
  return (
    <div
      className={!role ? `${styles.contentModal} modal ${isShowModal ? styles.active : ''}`
        : `${styles.contentModalRole} modal ${isShowModal ? styles.activeRole : ''}`}
    >
      {children}
    </div>
  )
}
