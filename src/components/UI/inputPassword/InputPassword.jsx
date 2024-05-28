import styles from './InputPassword.module.css';
import { useState } from 'react';
import { LockKey } from "../../../utilits/icon/lockKey";
import { Eye } from "../../../utilits/icon/eye";

export default function InputPassword({ classes, colorIcon, name, ...props }) {
  const forWrapper = classes?.join(' ');

  const [show, setShow] = useState(false)

  function handleToggle() {
    setShow(!show)
  }

  return (
    <div>
      {/* <p className={styles.inputTitle}>{children}</p> */}
      <div className={styles.inputPasswordWrapper + ' ' + forWrapper}>
        <LockKey color={colorIcon} />
        <input className={styles.inputPassword} type={show ? "text" : "password"} name={name} id="" placeholder="Введите ваш пароль" {...props} />
        <Eye onClick={handleToggle}/>
      </div>
    </div>
  );
}
