import Rollbar from 'rollbar'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.MODE || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
        source_map_enabled: true,
      },
    },
  },
}

let rollbarInstance = null

export const initRollbar = () => {
  if (!rollbarInstance) {
    rollbarInstance = new Rollbar(rollbarConfig)
  }
  return rollbarInstance
}

export default rollbarInstance
