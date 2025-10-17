// src/components/Footer.jsx
import React from 'react'

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>© {new Date().getFullYear()} Data Manager - Manajemen Data Mahasiswa</p>
      </div>
    </footer>
  )
}

export default Footer