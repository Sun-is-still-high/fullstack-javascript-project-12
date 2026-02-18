import { createRoot } from 'react-dom/client'
import './index.css'
import init from './init'

init().then((app) => {
  createRoot(document.getElementById('root')).render(app)
})
