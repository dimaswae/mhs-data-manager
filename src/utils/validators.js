// src/utils/validators.js
export function validateMahasiswa(data, existingList = [], currentId = null) {
  const errors = {}

  // Validate nama
  if (!data.nama || data.nama.trim() === '') {
    errors.nama = 'Nama is required'
  } else if (data.nama.trim().length < 3) {
    errors.nama = 'Nama must be at least 3 characters'
  }

  // Validate nim
  if (!data.nim || data.nim.trim() === '') {
    errors.nim = 'NIM is required'
  } else if (!/^[0-9A-Za-z-]+$/.test(data.nim)) {
    errors.nim = 'NIM can only contain letters, numbers, and hyphens'
  } else {
    // Check for duplicate NIM
    const duplicate = existingList.find(item => 
      item.nim === data.nim && item.id !== currentId
    )
    if (duplicate) {
      errors.nim = 'NIM already exists'
    }
  }

  // Validate email
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      errors.email = 'Invalid email format'
    }
  }

  // Validate programStudi
  if (!data.programStudi || data.programStudi.trim() === '') {
    errors.programStudi = 'Program Studi is required'
  }

  // Validate fakultas
  if (!data.fakultas || data.fakultas.trim() === '') {
    errors.fakultas = 'Fakultas is required'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}