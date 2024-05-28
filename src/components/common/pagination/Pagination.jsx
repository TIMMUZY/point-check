import styles from './Pagination.module.css'
import { useState, useEffect } from 'react'
import BtnText from '../../UI/btnText/BtnText'
import stylesBtnText from '../../UI/btnText/BtnText.module.css'
import BtnIcon from '../../UI/btnIcon/BtnIcon'
import stylesBtnIcon from '../../UI/btnIcon/BtnIcon.module.css'
import { Arrow } from '../../../utilits/icon/arrow'
import { ArrowRight } from '../../../utilits/icon/arrowRight'
import RadioButton from '../../UI/radioButton/RadioButton'
import { TriangleDown } from '../../../utilits/icon/triangleDown'
import { TriangleUp } from '../../../utilits/icon/triangleUp'

export default function Pagination({
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
  responsePages,
  responseElements,
}) {
  const options = [1, 5, 10, 20, 100] // варианты количества пропусков на страницу
  const paginationOffset = 2 // количество отображаемых соседних номеров страниц в пагинации
  const [totalPages, setTotalPages] = useState(5)
  const [totalElements, setTotalElements] = useState(10)
  const [isActive, setIsActive] = useState(false)

  const renderPages = () => {
    const pages = []

    for (
      let page = Math.max(pageNumber - paginationOffset, 2);
      page <= Math.min(pageNumber + paginationOffset, totalPages - 1);
      page++
    ) {
      pages.push(
        <BtnText
          key={page}
          classes={[
            stylesBtnText.pagination,
            pageNumber === page
              ? stylesBtnText.colorActive
              : stylesBtnIcon.colorGhost,
          ]}
          onClick={() => handlePagination(page)}
        >
          {page}
        </BtnText>,
      )
    }

    if (pageNumber - paginationOffset > 1) {
      pages.unshift(
        <BtnText
          key="ellipsis-before"
          classes={[
            stylesBtnText.pagination,
            stylesBtnIcon.colorGhost,
            stylesBtnText.cursorAuto,
          ]}
        >
          ...
        </BtnText>,
      )
    }

    if (pageNumber + paginationOffset < totalPages) {
      pages.push(
        <BtnText
          key="ellipsis-after"
          classes={[
            stylesBtnText.pagination,
            stylesBtnIcon.colorGhost,
            stylesBtnText.cursorAuto,
          ]}
        >
          ...
        </BtnText>,
      )
    }

    return pages
  }

  useEffect(() => {
    setTotalPages(responsePages)
    setTotalElements(responseElements)
  }, [responsePages, responseElements])

  function handleMinusPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1)
    }
  }

  function handlePlusPage() {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1)
    }
  }

  function handlePagination(page) {
    setPageNumber(page)
  }

  function handleDrop() {
    setIsActive(!isActive)
  }

  function handleItemsPerPageChange(option) {
    let currentPage = 1
    if (option > pageSize) {
      currentPage = Math.ceil((pageNumber * pageSize) / option)
    }
    if (option < pageSize) {
      currentPage = (pageNumber * pageSize - pageSize) / option + 1
    }
    setPageSize(option)
    setPageNumber(currentPage)
    setIsActive(false)
  }

  const view = () => {
    let from = pageNumber * pageSize - (pageSize - 1)
    let to = pageNumber * pageSize
    if (to > totalElements) {
      to = totalElements
    }
    if (totalPages) {
      return totalElements > 1 ? `${from} - ${to}` : `${to}`
    }
   return 0
  }

  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Проверяем, был ли клик выполнен внутри пагинации
      if (!event.target.closest('.selectPageSize')) {
        setIsActive(false)
      }
    }
    document.addEventListener('click', handleDocumentClick)
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <p className={styles.view}>Показано <span className={styles.bold}>{view()}</span> из <span className={styles.bold}>{totalElements? totalElements:0}</span></p>
      <div className={styles.pagination}>
        <BtnIcon
          icon={<Arrow />}
          classes={[
            stylesBtnIcon.pagination,
            stylesBtnIcon.square,
            stylesBtnIcon.colorWhite,
          ]}
          onClick={handleMinusPage}
        />
        <BtnText
          key={'firstPage'}
          classes={[
            stylesBtnText.pagination,
            pageNumber === 1
              ? stylesBtnText.colorActive + ' ' + stylesBtnText.cursorAuto
              : stylesBtnIcon.colorGhost,
          ]}
          onClick={() => handlePagination(1)}
        >
          1
        </BtnText>
        {renderPages()}
        {totalPages > 1 && (
          <BtnText
            key={'lastPage'}
            classes={[
              stylesBtnText.pagination,
              pageNumber === totalPages
                ? stylesBtnText.colorActive + ' ' + stylesBtnText.cursorAuto
                : stylesBtnIcon.colorGhost,
            ]}
            onClick={() => handlePagination(totalPages)}
          >
            {totalPages}
          </BtnText>
        )}
        <BtnIcon
          icon={<ArrowRight />}
          classes={[
            stylesBtnIcon.pagination,
            stylesBtnIcon.square,
            stylesBtnIcon.colorWhite,
          ]}
          onClick={handlePlusPage}
        />
      </div>
      <div className={styles.select + ' selectPageSize'}>
        <div
          className={
            isActive ? styles.header + ' ' + styles.active : styles.header
          }
          onClick={handleDrop}
        >
          <span className={styles.current}>
            Показывать по{' '}
            <span className={styles.bold + ' ' + styles.pageSize}>
              {pageSize}
            </span>
          </span>
          {isActive ? <TriangleUp /> : <TriangleDown />}
        </div>
        <ul className={styles.body + ' ' + styles.active} hidden={!isActive}>
          {options.map((option, index) => {
            return (
              <li key={index} className={styles.item}>
                <RadioButton
                  name={'sizeOfPage'}
                  onChange={() => handleItemsPerPageChange(option)}
                  checked={pageSize === option}
                >
                  Показывать по <span className={styles.bold}>{option}</span>
                </RadioButton>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
