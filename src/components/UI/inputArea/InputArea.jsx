import styles from './InputArea.module.css';

export default function InputArea({
  icon,
  value,
  placeholder,
  classes,
  type,
  name,
  ...props
}) {
  const forWrapper = classes?.join(' ')

  return (
    <div className={styles.inputAreaWrapper + ' ' + forWrapper}>
      {icon}
      <textarea
        className={styles.inputArea}
        value={value}
        type={type}
        name={name}
        placeholder={placeholder}
        rows={1}
        {...props}>
      </textarea>
    </div>
  )
}
