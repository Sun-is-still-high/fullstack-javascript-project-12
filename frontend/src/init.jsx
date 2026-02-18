import { StrictMode } from 'react'
import { I18nextProvider } from 'react-i18next'
import createI18n from './i18n'
import { initRollbar } from './rollbar'
import { initSocket } from './services/socket'
import App from './App.jsx'

const init = async () => {
  const i18n = await createI18n()
  initRollbar()
  initSocket()

  return (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>
  )
}

export default init
