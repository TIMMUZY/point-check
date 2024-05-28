import styles from './Spinner.module.css'

export const SpinnerSvg = ({ className }) => {
  return (
    <svg
      className={styles.spinner + ' ' + className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.2824 1.85778C9.06799 1.05758 9.54286 0.225065 10.3635 0.112088C12.5176 -0.184436 14.7219 0.108802 16.7369 0.974505C19.2135 2.03851 21.2597 3.90531 22.5458 6.27409C23.832 8.64288 24.2831 11.3757 23.8267 14.0322C23.3702 16.6887 22.0327 19.1141 20.0296 20.9177C18.0265 22.7213 15.4745 23.798 12.7848 23.9743C10.0952 24.1506 7.4245 23.4162 5.20313 21.8895C2.98176 20.3628 1.33907 18.1327 0.539762 15.5585C-0.110579 13.4641 -0.17179 11.2411 0.348263 9.1299C0.546404 8.32551 1.424 7.94026 2.1974 8.23714C2.97081 8.53402 3.34357 9.40137 3.17912 10.2133C2.8808 11.6861 2.95449 13.2186 3.40482 14.6689C4.0043 16.5995 5.23632 18.2721 6.90235 19.4171C8.56838 20.5622 10.5714 21.1129 12.5886 20.9807C14.6059 20.8485 16.5199 20.041 18.0222 18.6883C19.5245 17.3356 20.5277 15.5165 20.87 13.5241C21.2124 11.5318 20.874 9.48216 19.9094 7.70557C18.9447 5.92898 17.4101 4.52888 15.5527 3.73088C14.1574 3.13142 12.641 2.89795 11.1451 3.04068C10.3204 3.11936 9.49681 2.65798 9.2824 1.85778Z"
        fill="current"
      />
    </svg>
  )
}
