import React, { useContext } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import ModalRoot from './components/ModalRoot'
import { AppProvider, AppContext } from './context/AppContext'

function Shell() {
  const ctx = useContext(AppContext)

  return (
    <div className="min-h-screen grid" style={{ gridTemplateAreas: '"header header" "sidebar main"', gridTemplateColumns: '280px 1fr' }}>
      <div className="layout-header">
        <Header />
      </div>
      <Sidebar />
      <main className="p-8 layout-main">
        {ctx.currentSection === 'dashboard' && <Dashboard />}
      </main>
      <ModalRoot />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
