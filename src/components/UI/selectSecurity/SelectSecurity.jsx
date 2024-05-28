import styles from './SelectSecurity.module.css'
import { useEffect, useState } from 'react'
import RadioButton from '../radioButton/RadioButton'
import { TriangleDown } from "../../../utilits/icon/triangleDown"
import { TriangleUp } from "../../../utilits/icon/triangleUp"

export default function SelectSecurity({
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

  function isClickaway(target, ...selectors) {
    const isOnSelectorClick = selectors.some(s => {
      if(target.closest(s)) return true
      
      return false
    })

    return !isOnSelectorClick
  }

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Проверяем, был ли клик выполнен внутри фильтров
      if (isClickaway(event.target, "#select_security_header", "#select_security_body")) {
        setIsActive(false)
      }
    }
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return (
    <div className={styles.select + ' ' + forSelect} {...props}>
      <div id="select_security_header" className={isActive ? styles.header + ' ' + styles.active : styles.header} onClick={handleDrop}>
        {icon}
        <span className={styles.current}>{selected}</span>
        {isActive ? <TriangleUp /> : <TriangleDown />}
      </div>
      <ul id="select_security_body" className={styles.body + ' ' + styles.active} hidden={!isActive}>
        {options.map((option, index) => {
          return <li key={index} className={styles.item}>
            <RadioButton name={name} onChange={() => handleChoice(option)} checked={selected.includes(option.name)}>{option.name}</RadioButton>
          </li>
        })}
      </ul>
    </div>
  )
}
