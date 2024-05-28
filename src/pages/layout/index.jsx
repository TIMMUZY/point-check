// import { NavLink } from 'react-router-dom'
import styles from './Layout.module.css'
import { LayoutContent } from '../../components/layoutContent/LayoutContent'
import { Logo } from '../../utilits/icon/logo'
import { LogoText } from '../../utilits/icon/logoText'
import { Link, Outlet } from 'react-router-dom'
import BottomMenu from '../../components/BottomMenu/BottomMenu'
import { useContext } from 'react'
import { ResponsiveContext } from '../../components/context/ResponsiveContext'

export default function PageLayout() {
  const { isMobile, isDesktop } = useContext(ResponsiveContext)

  if (isMobile) {
    return (
      <>
        <Outlet />
        <BottomMenu />
      </>
    )
  }

  return (
    <>
      <header className={styles.header}>
        <Link to="/">{isDesktop ? <LogoText /> : <Logo />}</Link>
        <LayoutContent />
      </header>
      <Outlet />
    </>
  )
}
