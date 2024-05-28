import styles from './Select.module.css'
import { useState } from 'react'
import RadioButton from '../radioButton/RadioButton'
import { TriangleDown } from "../../../utilits/icon/triangleDown"
import { TriangleUp } from "../../../utilits/icon/triangleUp"

export default function Select({
  classes,
  icon,
  name,
  options,
  selected,
  setSelected,
  ...props
}) {
  const forSelect = classes?.join(' ')

  const [isActive, setIsActive] = useState(false)

  function handleDrop() {
    setIsActive(!isActive)
  }

  function handleChoice(option) {
    setSelected(option)
    setIsActive(false)
  }

  return (
    <div className={styles.select + ' ' + forSelect} {...props}>
      <div className={isActive ? styles.header + ' ' + styles.active : styles.header} onClick={handleDrop}>
        {icon}
        <span className={styles.current}>{selected}</span>
        {isActive ? <TriangleUp /> : <TriangleDown />}
      </div>
      <ul className={styles.body + ' ' + styles.active} hidden={!isActive}>
        {options.map((option, index) => {
          return <li key={index} className={styles.item}>
            <RadioButton name={name} onChange={() => handleChoice(option)} checked={selected.includes(option)}>{option}</RadioButton>
          </li>
        })}
      </ul>
    </div>
  )
}
