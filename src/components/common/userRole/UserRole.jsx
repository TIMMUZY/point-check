import styles from './UserRole.module.css';

export default function UserRole({ children, className }) {
  let color
  let childrenRus
  switch (children) {
    case 'USER': color = styles.user
    childrenRus = 'Пользователь'
      break
    case 'SECURITY': color = styles.security
    childrenRus = 'Охрана'
      break
    case 'MANAGER': color = styles.manager
    childrenRus = 'Менеджер'
      break
    case 'ADMIN': color = styles.admin
    childrenRus = 'Админ'
      break
  }
  return (
    <span className={styles.userRole + ' ' + color + ' ' + className}>
      {childrenRus}
    </span>
  );
}
