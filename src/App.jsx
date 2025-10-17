// src/App.jsx
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import AddMahasiswa from './pages/AddMahasiswa'
import EditMahasiswa from './pages/EditMahasiswa'
import { useLocalStorage } from './hooks/useLocalStorage'

// Simple Toast System
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  }[type] || 'alert-info'

  return (
    <div className="toast toast-top toast-end z-50">
      <div className={`alert ${bgColor} text-white`}>
        <span>{message}</span>
      </div>
    </div>
  )
}

const ToastContext = React.createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddMahasiswa />} />
        <Route path="/edit/:id" element={<EditMahasiswa />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [theme, setTheme] = useLocalStorage('dataManager.theme', 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-base-100 flex flex-col">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main className="flex-grow container mx-auto px-4 py-8">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App