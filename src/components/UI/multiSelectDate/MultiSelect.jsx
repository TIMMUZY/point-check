import styles from './MultiSelect.module.css'
import { useState } from 'react'
import CheckBox from '../checkBox/CheckBox'
import { TriangleDown } from "../../../utilits/icon/triangleDown";
import { TriangleUp } from "../../../utilits/icon/triangleUp";

export default function MultiSelectDate({
  children,
  classes,
  icon,
  name,
  options,
  ...props
}) {
  const forSelect = classes?.join(' ')

  const [selected, setSelected] = useState([])

  const [isActive, setIsActive] = useState(false)

  function handleDrop() {
    setIsActive(!isActive)
  }

  function handleChoice(option) {
    const isSelected = selected.includes(option)
    if (isSelected) {
      setSelected(selected.filter(elem => elem !== option))
    } else {
      setSelected([...selected, option])
    }
  }

  return (
    <div className={styles.select + ' ' + forSelect} {...props}>
      <div className={isActive ? styles.header + ' ' + styles.active : styles.header}>
        {icon}
        <span className={styles.current} onClick={handleDrop}>{children}</span>
        {isActive ? <TriangleUp /> : <TriangleDown />}
      </div>
      <ul className={styles.body + ' ' + styles.active} hidden={!isActive}>
        {options.map((option, index) => {
          return <li key={index} className={styles.item}>
            <CheckBox name={name} onChange={() => handleChoice(option)}>{option}</CheckBox>
          </li>
        })}
      </ul>
      {selected.length ?
        <div className={styles.count}>{selected.length}</div>
        : null
      }
    </div>
  )
}
