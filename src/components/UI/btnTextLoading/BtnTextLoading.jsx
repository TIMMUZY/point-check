import styles from './BtnTextLoading.module.css';
import { SpinnerSvg } from "../../../utilits/icon/spinner";

export default function BtnTextLoading({ classes, spinnerClasses, ...props }) {
  const forBtn = classes?.join(' ');
  const forSpinner = spinnerClasses?.join(' ');
  return (
    <button className={styles.btnLoading + ' ' + forBtn} type="button" {...props}>
      <SpinnerSvg className={forSpinner} />
    </button>
  );
}
