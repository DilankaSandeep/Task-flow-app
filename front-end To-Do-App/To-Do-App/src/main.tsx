import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {UserProvider} from "./contex/UserContex.tsx";
import Datepicker from "tailwind-datepicker-react";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <UserProvider>
          <App />
      </UserProvider>

  </React.StrictMode>,
)
