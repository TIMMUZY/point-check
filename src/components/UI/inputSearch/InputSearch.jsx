import styles from './InputSearch.module.css'
import { useCallback, useEffect, useState, useRef } from 'react'
import { debounce } from '../../../utilits/helpers'
import { Search } from '../../../utilits/icon/search'
import { ClearSvg } from '../../../utilits/icon/clear'

export default function InputSearch({
  classes,
  colorIcon,
  name,
  search,
  setSearch,
  ...props
}) {
  const forWrapper = classes?.join(' ')
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef()

  const updateSearch = useCallback(
    debounce((str) => {
      setSearch(str)
    }, 250), // задержка при отправке запроса на сервер (в ms)
    [],
  )

  useEffect(() => {
    if (search === '') setSearchValue('')
  }, [search])

  const onChangeInput = (event) => {
    setSearchValue(event.target.value)
    updateSearch(event.target.value)
  }

  const onClickClear = () => {
    setSearch('')
    setSearchValue('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <div className={styles.inputSearchWrapper + ' ' + forWrapper}>
        <Search color={colorIcon} />
        <input
          ref={inputRef}
          className={styles.inputSearch}
          type="search"
          name={name}
          placeholder="Поиск"
          value={searchValue}
          onChange={onChangeInput}
          {...props}
        />

        {searchValue && (
          <div onClick={onClickClear}>
            <ClearSvg />
          </div>
        )}
      </div>
    </div>
  )
}
