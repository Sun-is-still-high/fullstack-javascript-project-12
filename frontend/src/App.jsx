import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NotFoundPage from './pages/NotFoundPage'
import Header from './components/Header'
import ModalManager from './components/ModalManager'
import store from './store'
import { appRoutes } from './routes'

const AUTOCLOSE_TIMER = 5000

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <div className="d-flex flex-column h-100">
            <Header />
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path={appRoutes.chat} element={<ChatPage />} />
              </Route>
              <Route path={appRoutes.login} element={<LoginPage />} />
              <Route path={appRoutes.signup} element={<SignupPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <ModalManager />
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={AUTOCLOSE_TIMER}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  )
}

export default App
