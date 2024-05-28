import styles from './BottomMenu.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import BtnBottomMenu from './btnBottomMenu/BtnBottomMenu'
import { Ticket, Bell, Add } from '../../utilits/icon'

export default function BottomMenu() {
  const location = useLocation()
  return (
    <footer className={styles.footer}>
      <NavLink to="/">
        <BtnBottomMenu icon={<Ticket />} location={location.pathname === '/'}>
          {' '}
          Пропуска{' '}
        </BtnBottomMenu>
      </NavLink>
      <NavLink to="/addPass">
        <BtnBottomMenu
          icon={<Add />}
          location={location.pathname === '/addPass'}
        >
          {' '}
          Создать{' '}
        </BtnBottomMenu>
      </NavLink>
      <NavLink to="/events">
        <BtnBottomMenu
          icon={<Bell />}
          location={location.pathname === '/events'}
        >
          {' '}
          События{' '}
        </BtnBottomMenu>
      </NavLink>
    </footer>
  )
}
