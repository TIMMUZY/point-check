import styles from './MultiSelect.module.css'
import { useEffect, useState } from 'react'
import CheckBox from '../checkBox/CheckBox'
import { TriangleDown } from "../../../utilits/icon/triangleDown";
import { TriangleUp } from "../../../utilits/icon/triangleUp";

export default function MultiSelect({
  children,
  classes,
  icon,
  name,
  options,
  selected,
  setSelected,
  currentFilter,
  setCurrentFilter,
  ...props
}) {
  const forSelect = classes?.join(' ')

  const [isActive, setIsActive] = useState(false)

  const handleDrop = () => {
    if (currentFilter === name) {
      setIsActive(!isActive)
    } else {
      setCurrentFilter(name)
    }
  }

  useEffect(() => {
    if (currentFilter === name) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [currentFilter])

  function handleChoice(option) {
    const isSelected = selected.includes(option)
    if (isSelected) {
      setSelected(selected.filter(elem => elem !== option))
    } else {
      setSelected([...selected, option])
    }
  }

  return (
    <div className={styles.select + ' ' + forSelect + ' filter'} {...props}>
      <div className={isActive ? styles.header + ' ' + styles.active : styles.header} onClick={handleDrop}>
        {icon}
        <span className={styles.current}>{children}</span>
        {isActive ? <TriangleUp /> : <TriangleDown />}
      </div>
      <ul className={styles.body + ' ' + styles.active} hidden={!isActive}>
        {options.map((option, index) => {
          return <li key={index} className={styles.item}>
            <CheckBox name={name} onChange={() => {handleChoice(option)}} checked={selected.includes(option)} >{option}</CheckBox>
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
