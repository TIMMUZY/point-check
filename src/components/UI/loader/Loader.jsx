import styles from './Loader.module.css'
import { LoaderCar } from '../../../utilits/icon/loaderCar'

export default function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.elementAnimation}>
        <LoaderCar />
      </div>
    </div>
  );
};
