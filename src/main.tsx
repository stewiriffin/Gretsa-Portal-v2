import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DarkModeProvider } from './contexts/DarkModeContext'
import { RoleProvider } from './contexts/RoleContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { QueryProvider } from './providers/QueryProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <DarkModeProvider>
        <RoleProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </RoleProvider>
      </DarkModeProvider>
    </QueryProvider>
  </StrictMode>,
)
