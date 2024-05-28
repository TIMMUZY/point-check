import { createContext } from "react";
import { useMediaQuery } from 'react-responsive'
import { SCREEN_SIZE } from '../../utilits/constants'

export const ResponsiveContext = createContext({
  isMobile: false,
  isTablet: false,
  isDesktop: true
});

export const ResponsiveContextProvider = ({ children }) => {
  const isMobile = useMediaQuery({
    query: SCREEN_SIZE.mobile,
  })
  const isTablet = useMediaQuery({
    query: SCREEN_SIZE.tablet,
  })
  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })

  return (
    <ResponsiveContext.Provider value={{ isMobile, isTablet, isDesktop }}>
      {children}
    </ResponsiveContext.Provider>
  )
}
