import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DarkModeProvider } from './contexts/DarkModeContext'
import { RoleProvider } from './contexts/RoleContext'
import { NotificationProvider } from './contexts/NotificationContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DarkModeProvider>
      <RoleProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </RoleProvider>
    </DarkModeProvider>
  </StrictMode>,
)
