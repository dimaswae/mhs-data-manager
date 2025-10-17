// src/pages/EditMahasiswa.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { getMahasiswa, saveMahasiswa } from '../utils/storage'
import { validateMahasiswa } from '../utils/validators'

const EditMahasiswa = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    nama: '',
    nim: '',
    programStudi: '',
    fakultas: '',
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const existingData = getMahasiswa()
    const student = existingData.find(item => item.id === id)
    
    if (student) {
      setFormData(student)
    } else {
      toast.error('Mahasiswa not found')
      navigate('/')
    }
    
    setIsLoading(false)
  }, [id, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const existingData = getMahasiswa()
    const validation = validateMahasiswa(formData, existingData, id)

    if (!validation.valid) {
      setErrors(validation.errors)
      toast.error('Please fix the validation errors')
      setIsSubmitting(false)
      return
    }

    try {
      const updatedData = existingData.map(item =>
        item.id === id ? { ...formData, id } : item
      )
      
      saveMahasiswa(updatedData)
      toast.success('Mahasiswa updated successfully!')
      navigate('/')
    } catch (error) {
      toast.error('Error updating mahasiswa: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const programStudiOptions = [
    'Informatika',
    'Sistem Informasi',
    'Teknik Elektro',
    'Teknik Mesin',
    'Teknik Sipil',
    'Manajemen',
    'Akuntansi',
    'Kedokteran',
    'Farmasi',
    'Psikologi',
    'Hukum',
    'Ilmu Komunikasi'
  ]

  const fakultasOptions = [
    'Sains & Teknologi',
    'Teknik',
    'Ekonomi & Bisnis',
    'Kedokteran',
    'Farmasi',
    'Psikologi',
    'Hukum',
    'Ilmu Komunikasi',
    'Pertanian',
    'Kedokteran Hewan'
  ]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto"
    >
      <div className="card bg-base-200 shadow-sm">
        <div className="card-body">
          <h1 className="card-title text-2xl">Edit Mahasiswa</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nama Lengkap *"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Enter full name"
              error={errors.nama}
              required
            />

            <Input
              label="NIM *"
              name="nim"
              value={formData.nim}
              onChange={handleChange}
              placeholder="Enter student ID"
              error={errors.nim}
              required
            />

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Program Studi *</span>
              </label>
              <select
                name="programStudi"
                value={formData.programStudi}
                onChange={handleChange}
                className={`select select-bordered w-full ${errors.programStudi ? 'select-error' : ''}`}
                required
              >
                <option value="">Select Program Studi</option>
                {programStudiOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.programStudi && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.programStudi}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Fakultas *</span>
              </label>
              <select
                name="fakultas"
                value={formData.fakultas}
                onChange={handleChange}
                className={`select select-bordered w-full ${errors.fakultas ? 'select-error' : ''}`}
                required
              >
                <option value="">Select Fakultas</option>
                {fakultasOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {errors.fakultas && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.fakultas}</span>
                </label>
              )}
            </div>

            <Input
              label="Email *"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              error={errors.email}
              required
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Updating...' : 'Update Mahasiswa'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default EditMahasiswa