import styles from './AvaBlockWrapper.module.css'

export const AvaBlockWrapper = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.icon}
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 23C21.6955 22.9964 21.3973 23.0862 21.1454 23.2573C20.8936 23.4284 20.7001 23.6725 20.5912 23.9568C20.4823 24.2411 20.4631 24.552 20.5361 24.8476C20.6092 25.1431 20.7711 25.4092 21 25.61V27C21 27.2652 21.1054 27.5196 21.2929 27.7071C21.4804 27.8946 21.7348 28 22 28C22.2652 28 22.5196 27.8946 22.7071 27.7071C22.8946 27.5196 23 27.2652 23 27V25.61C23.2289 25.4092 23.3908 25.1431 23.4639 24.8476C23.5369 24.552 23.5177 24.2411 23.4088 23.9568C23.2999 23.6725 23.1064 23.4284 22.8546 23.2573C22.6027 23.0862 22.3045 22.9964 22 23ZM27 19V17C27 15.6739 26.4732 14.4021 25.5355 13.4645C24.5979 12.5268 23.3261 12 22 12C20.6739 12 19.4021 12.5268 18.4645 13.4645C17.5268 14.4021 17 15.6739 17 17V19C16.2044 19 15.4413 19.3161 14.8787 19.8787C14.3161 20.4413 14 21.2044 14 22V29C14 29.7956 14.3161 30.5587 14.8787 31.1213C15.4413 31.6839 16.2044 32 17 32H27C27.7956 32 28.5587 31.6839 29.1213 31.1213C29.6839 30.5587 30 29.7956 30 29V22C30 21.2044 29.6839 20.4413 29.1213 19.8787C28.5587 19.3161 27.7956 19 27 19ZM19 17C19 16.2044 19.3161 15.4413 19.8787 14.8787C20.4413 14.3161 21.2044 14 22 14C22.7956 14 23.5587 14.3161 24.1213 14.8787C24.6839 15.4413 25 16.2044 25 17V19H19V17ZM28 29C28 29.2652 27.8946 29.5196 27.7071 29.7071C27.5196 29.8946 27.2652 30 27 30H17C16.7348 30 16.4804 29.8946 16.2929 29.7071C16.1054 29.5196 16 29.2652 16 29V22C16 21.7348 16.1054 21.4804 16.2929 21.2929C16.4804 21.1054 16.7348 21 17 21H27C27.2652 21 27.5196 21.1054 27.7071 21.2929C27.8946 21.4804 28 21.7348 28 22V29Z"
          fill="white"
        />
      </svg>
      {children}
    </div>
  )
}
