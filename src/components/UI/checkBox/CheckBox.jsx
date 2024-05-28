import styles from './CheckBox.module.css';

export default function CheckBox({ children, name, ...props }) {
  return (
    <label className={styles.label}>
      <input className={styles.input} type="checkbox" id="" name={name} {...props} />
      <span className={styles.checkBox}></span>
      {children}
    </label>
  );
}
