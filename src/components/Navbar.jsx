// src/components/Navbar.jsx (Simpler version)
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation()

  return (
    <motion.nav 
      className="navbar bg-base-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold text-primary">
            Data Manager
          </Link>
        </div>
        
        <div className="flex-none flex items-center gap-4">
          <motion.button
            className="btn btn-ghost btn-circle"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </motion.button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/add" 
              className={`btn btn-primary ${location.pathname === '/add' ? 'btn-active' : ''}`}
            >
              Add New
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar