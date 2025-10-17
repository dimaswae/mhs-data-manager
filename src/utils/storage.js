// src/utils/storage.js
import { v4 as uuidv4 } from 'uuid'

const MAHASISWA_KEY = 'dataManager.mahasiswa'

const sampleData = [
  { id: "1", nama: "Ahmad Fauzi", nim: "2021001", programStudi: "Informatika", fakultas: "Sains & Teknologi", email: "ahmad.fauzi@mail.univ.edu" },
  { id: "2", nama: "Siti Rahayu", nim: "2021002", programStudi: "Sistem Informasi", fakultas: "Sains & Teknologi", email: "siti.rahayu@mail.univ.edu" },
  { id: "3", nama: "Budi Santoso", nim: "2021003", programStudi: "Teknik Elektro", fakultas: "Teknik", email: "budi.santoso@mail.univ.edu" },
  { id: "4", nama: "Maya Sari", nim: "2021004", programStudi: "Manajemen", fakultas: "Ekonomi", email: "maya.sari@mail.univ.edu" },
  { id: "5", nama: "Rizki Pratama", nim: "2021005", programStudi: "Kedokteran", fakultas: "Kedokteran", email: "rizki.pratama@mail.univ.edu" }
]

export function getMahasiswa() {
  try {
    const data = localStorage.getItem(MAHASISWA_KEY)
    if (!data) {
      saveMahasiswa(sampleData)
      return sampleData
    }
    return JSON.parse(data)
  } catch (error) {
    console.error('Error getting mahasiswa data:', error)
    return []
  }
}

export function saveMahasiswa(data) {
  try {
    localStorage.setItem(MAHASISWA_KEY, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving mahasiswa data:', error)
    return false
  }
}

export function clearMahasiswa() {
  try {
    localStorage.removeItem(MAHASISWA_KEY)
    return true
  } catch (error) {
    console.error('Error clearing mahasiswa data:', error)
    return false
  }
}

export function generateId() {
  return uuidv4()
}