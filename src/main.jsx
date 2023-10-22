import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App.jsx'
import './index.css'
// import './bs_customization/bs_customization.scss';
// import 'bootstrap/dist/css/bootstrap.css';
// import './src/bs_customization/bs_customization.min.css';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
