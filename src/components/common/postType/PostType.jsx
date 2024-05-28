import styles from './PostType.module.css';
import { Tick } from '../../../utilits/icon/tick'
import { Car } from '../../../utilits/icon/car'
import { Profile } from '../../../utilits/icon/profile'

export default function PostType({ children, colorThemeSecurity, className }) {
  let color
  let icon
  if (colorThemeSecurity === true) {
    color = styles.white
  } else {
    color = styles.gray
  }
  let childrenRus
  switch (children) {
    case 'UNIVERSAL': icon = <Tick />
    childrenRus = 'Универсальный'
      break
    case 'WALK': icon = <Profile />
    childrenRus = 'Пешеходный'
      break
    case 'AUTO': icon = <Car />
    childrenRus = 'Автомобильный'
      break
  }
  return (
    <div className={styles.userRole + ' ' + color + ' ' + className}>
      {icon}
      <p>{childrenRus}</p>
    </div>
  );
}
