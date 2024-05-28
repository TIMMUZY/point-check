import styles from './RadioButton.module.css';
import { Accept } from '../../../utilits/icon/accept'

export default function RadioButton({ children, name, role, ...props }) {
  return (
    <label className={!role ? styles.label : styles.labelRole}>
      <input className={styles.input} type="radio" id="" name={name} {...props} />
      {!role ? <span className={styles.radioBox}></span> : <span className={styles.radioBoxRole}><Accept /></span>}
      {children}
    </label>
  );
}
