import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import UserContext from './components/context/UserContext'
import AppRoutes from './routes'
import { useDispatch } from 'react-redux'
import {
  useGetTerritoryAllQuery,
  useGetTerritoryUserQuery,
} from './store/RTKQuery/territory'
import {
  setTerritoriesAllList,
  setTerritoriesUserList,
} from './store/slices/territorySlice'
import { ResponsiveContextProvider } from './components/context/ResponsiveContext'

export default function App() {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem('user')) || null,
  )
  const [loading, setLoading] = useState(false)
  const { data: territoryAllData } = useGetTerritoryAllQuery()
  const { data: territoryUserData } = useGetTerritoryUserQuery(user?.id)
  const dispatch = useDispatch()

  useEffect(() => {
    if (territoryAllData && user.id && user.role === 'ADMIN') {
      dispatch(setTerritoriesAllList(territoryAllData))
    }
  }, [territoryAllData])

  useEffect(() => {
    if (territoryUserData && user.id) {
      dispatch(setTerritoriesUserList(territoryUserData))
    }
  }, [territoryUserData])

  return (
    <>
      <ResponsiveContextProvider>
        <UserContext.Provider value={{ user, setUser }}>
          <AppRoutes loading={loading} setLoading={setLoading} />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            limit={1}
          />
        </UserContext.Provider>
      </ResponsiveContextProvider>
    </>
  )
}
