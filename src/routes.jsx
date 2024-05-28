import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/protectedRoute'
import { useState } from 'react'
import AuthPage from './pages/auth'
import CheckAuthPage from './pages/checkAuth'
import MainPage from './pages/main'
import PageLayout from './pages/layout'
import AddPassPage from './pages/addPass'
import NotFound from './pages/notFound'
import EventsPage from './pages/events'
import TerritoriesPage from './pages/territories'
import TerritoryPage from './pages/territory'
import AddTerritoryPage from './pages/addTerritory'
import EditTerritoryPage from './pages/editTerritory'
import PersonalPage from './pages/personal'
import ConfirmEmailPage from './pages/confirnEmail'
import { ChangEmailPage } from './pages/changeEmailPage'
import { ChangPasswordPage } from './pages/changePasswordPage'
import UsersPage from './pages/users'
import RegistrationPage from './pages/registration'

function AppRoutes() {
  const [isLoginMode, setIsLoginMode] = useState(false)
  const authEmail = sessionStorage.getItem('authEmail')
  const [email, setEmail] = useState(authEmail || '')
  const [userName, setUserName] = useState('')
  const user = JSON.parse(sessionStorage?.getItem('user'))

  return (
    <Routes>
      <Route
        path="/checkAuth"
        element={
          <CheckAuthPage
            setIsLoginMode={setIsLoginMode}
            isLoginMode={isLoginMode}
            email={email}
            setEmail={setEmail}
            setUserName={setUserName}
          />
        }
      />
      <Route
        path="/Auth"
        element={
          <AuthPage
            isLoginMode={isLoginMode}
            email={email}
            setEmail={setEmail}
            userName={userName}
          />
        }
      />
      <Route
        path="/confirmEmail"
        element={<ConfirmEmailPage email={email} />}
      />
      <Route
        path="/registration/:token"
        element={<RegistrationPage setIsLoginMode={setIsLoginMode} />}
      />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<PageLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/territories" element={<TerritoriesPage />} />
          <Route path="/territory/:id" element={<TerritoryPage />} />
          {(user?.role === 'ADMIN' || user?.role === 'MANAGER') &&
            <>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/editTerritory" element={<EditTerritoryPage />} />
            </>}
          {user?.role === 'ADMIN' &&
            <Route path="/addTerritory" element={<AddTerritoryPage />} />}
          <Route path="/addPass" element={<AddPassPage />} />
          <Route path="/addPass/:id" element={<AddPassPage isRepeat />} />
          <Route path="/changePass/:id" element={<AddPassPage isEdit />} />
          <Route
            path="/personal"
            element={<PersonalPage email={email} setEmail={setEmail} />}
          />
          <Route
            path="/changeEmail"
            element={<ChangEmailPage setEmail={setEmail} />}
          />
          <Route path="/changePassword" element={<ChangPasswordPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
