import styles from './ModalChangeRole.module.css'
import RadioButton from '../../UI/radioButton/RadioButton'
import { useMemo } from 'react'
// import BtnIcon from '../UI/btnIcon/BtnIcon'
// import stylesBtnIcon from '../UI/btnIcon/BtnIcon.module.css'
// import { Close } from '../../utilits/icon/close'

export default function ModalChangeRole({
  selectedRole,
  setSelectedRole,
  handleChangeRole,
  ...props
}) {
  const user = useMemo(() => {
    return JSON.parse(sessionStorage?.getItem('user'))
  }, [])

  let options = []

  const userRole = [
    { role: 'USER', roleRus: 'Пользователь' },
    { role: 'SECURITY', roleRus: 'Охрана' },
    { role: 'MANAGER', roleRus: 'Менеджер' },
    { role: 'ADMIN', roleRus: 'Админ' },
  ]

  if (user.role === 'ADMIN') {
    options = userRole
  } else {
    userRole.pop()
    options = userRole
  }

  function handleChoice(option) {
    setSelectedRole(option)
    handleChangeRole(option)
  }

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.container}>
        <ul className={styles.body + ' ' + styles.active}>
          {options.map((option, index) => {
            return (
              <li key={index} className={styles.item}>
                <RadioButton
                  name={'role'}
                  onChange={() => handleChoice(option.role)}
                  checked={selectedRole.includes(option.role)}
                  role
                >
                  {option.roleRus}
                </RadioButton>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
