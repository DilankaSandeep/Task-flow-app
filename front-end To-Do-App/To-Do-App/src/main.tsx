import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {UserProvider} from "./contex/UserContex.tsx";
import Datepicker from "tailwind-datepicker-react";
import {TaskListProvider} from "./contex/TaskListContex.tsx";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <UserProvider>
          <TaskListProvider>
              <App />
          </TaskListProvider>

      </UserProvider>

  </React.StrictMode>,
)
