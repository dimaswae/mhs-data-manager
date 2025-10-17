// src/pages/Dashboard.jsx
import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

import Table from '../components/ui/Table'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Pagination from '../components/Pagination'
import Input from '../components/ui/Input'
import { getMahasiswa, saveMahasiswa, clearMahasiswa } from '../utils/storage'
import { exportToCSV, parseCSVFile } from '../utils/csv'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d']

const Dashboard = () => {
  const [mahasiswa, setMahasiswa] = useState(getMahasiswa())
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [resetModalOpen, setResetModalOpen] = useState(false)
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [importMode, setImportMode] = useState('merge')
  const [importFile, setImportFile] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const PAGE_SIZE = 10

  // Filter and search functionality
  const filteredData = useMemo(() => {
    let filtered = mahasiswa

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(term)
        )
      )
    }

    // Apply sorting
    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [mahasiswa, searchTerm, sortConfig])

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE
    return filteredData.slice(startIndex, startIndex + PAGE_SIZE)
  }, [filteredData, currentPage])

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE)

  // Statistics
  const stats = useMemo(() => {
    const total = mahasiswa.length
    const byFakultas = mahasiswa.reduce((acc, item) => {
      acc[item.fakultas] = (acc[item.fakultas] || 0) + 1
      return acc
    }, {})

    const chartData = Object.entries(byFakultas).map(([name, value]) => ({
      name,
      value,
      count: value
    }))

    return { total, byFakultas: chartData }
  }, [mahasiswa])

  const handleDelete = (student) => {
    setSelectedStudent(student)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    const updatedList = mahasiswa.filter(item => item.id !== selectedStudent.id)
    setMahasiswa(updatedList)
    saveMahasiswa(updatedList)
    setDeleteModalOpen(false)
    setSelectedStudent(null)
    toast.success('Mahasiswa deleted successfully')
  }

  const handleResetData = () => {
    clearMahasiswa()
    setMahasiswa(getMahasiswa()) // This will load sample data
    setResetModalOpen(false)
    toast.success('All data has been reset')
  }

  const handleExportCSV = () => {
    try {
      const date = new Date().toISOString().split('T')[0].replace(/-/g, '')
      exportToCSV(mahasiswa, `data-manager-mahasiswa-${date}.csv`)
      toast.success('Data exported successfully')
    } catch (error) {
      toast.error('Error exporting data: ' + error.message)
    }
  }

  const handleImportCSV = async () => {
    if (!importFile) {
      toast.error('Please select a file')
      return
    }

    try {
      const { rows, errors } = await parseCSVFile(importFile)

      if (errors.length > 0) {
        toast.error(`Import completed with ${errors.length} errors`)
        console.warn('Import errors:', errors)
      }

      let updatedList
      if (importMode === 'replace') {
        updatedList = rows
      } else {
        // Merge mode - check for duplicates by NIM
        const existingNims = new Set(mahasiswa.map(item => item.nim))
        const newRows = rows.filter(row => !existingNims.has(row.nim))
        updatedList = [...mahasiswa, ...newRows]
        
        if (newRows.length < rows.length) {
          toast.warning(`${rows.length - newRows.length} duplicate records skipped`)
        }
      }

      setMahasiswa(updatedList)
      saveMahasiswa(updatedList)
      setImportModalOpen(false)
      setImportFile(null)
      toast.success(`Imported ${rows.length - errors.length} records successfully`)
    } catch (error) {
      toast.error('Error importing data: ' + error.message)
    }
  }

  const columns = [
    {
      key: 'nama',
      title: 'Nama',
      sortable: true
    },
    {
      key: 'nim',
      title: 'NIM',
      sortable: true
    },
    {
      key: 'programStudi',
      title: 'Program Studi',
      sortable: true
    },
    {
      key: 'fakultas',
      title: 'Fakultas',
      sortable: true
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true
    },
    {
      key: 'actions',
      title: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div className="flex gap-2">
          <Button
            as="a"
            href={`/edit/${row.id}`}
            variant="secondary"
            className="btn-sm"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="btn-sm"
            onClick={() => handleDelete(row)}
          >
            Delete
          </Button>
        </div>
      )
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Dashboard</h1>
          <p className="text-base-content/60">Manage mahasiswa data efficiently</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setImportModalOpen(true)}>
            Import CSV
          </Button>
          <Button variant="secondary" onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button variant="danger" onClick={() => setResetModalOpen(true)}>
            Reset All Data
          </Button>
        </div>
      </div>

      {/* Stats and Search Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Panel */}
        <motion.div 
          className="lg:col-span-1 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Statistics</h3>
              
              <div className="space-y-4">
                <div className="stat">
                  <div className="stat-title">Total Mahasiswa</div>
                  <div className="stat-value text-primary">{stats.total}</div>
                </div>

                {stats.byFakultas.length > 0 && (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.byFakultas}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {stats.byFakultas.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div 
          className="lg:col-span-2 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Search */}
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <Input
                label="Search"
                placeholder="Search across all fields..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body">
              <Table
                columns={columns}
                data={paginatedData}
                onSort={(key, direction) => setSortConfig({ key, direction })}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        title="Delete Mahasiswa"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        confirmVariant="danger"
        confirmLabel="Delete"
      >
        <p>Are you sure you want to delete <strong>{selectedStudent?.nama}</strong>?</p>
        <p className="text-sm text-warning mt-2">This action cannot be undone.</p>
      </Modal>

      {/* Reset Data Modal */}
      <Modal
        isOpen={resetModalOpen}
        title="Reset All Data"
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleResetData}
        confirmVariant="danger"
        confirmLabel="Reset All Data"
      >
        <p>Are you sure you want to reset all data?</p>
        <p className="text-sm text-warning mt-2">
          This will delete all mahasiswa records and cannot be undone. Sample data will be loaded.
        </p>
      </Modal>

      {/* Import CSV Modal */}
      <Modal
        isOpen={importModalOpen}
        title="Import CSV"
        onClose={() => {
          setImportModalOpen(false)
          setImportFile(null)
        }}
        onConfirm={handleImportCSV}
        confirmLabel="Import"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">Select CSV File</span>
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={(e) => setImportFile(e.target.files[0])}
              className="file-input file-input-bordered w-full"
            />
            <label className="label">
              <span className="label-text-alt">
                CSV must have headers: id, nama, nim, programStudi, fakultas, email
              </span>
            </label>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Import Mode</span>
            </label>
            <div className="flex gap-4">
              <label className="cursor-pointer label">
                <input
                  type="radio"
                  name="importMode"
                  value="merge"
                  checked={importMode === 'merge'}
                  onChange={(e) => setImportMode(e.target.value)}
                  className="radio radio-primary"
                />
                <span className="label-text ml-2">Merge - Add new records, skip duplicates</span>
              </label>
              <label className="cursor-pointer label">
                <input
                  type="radio"
                  name="importMode"
                  value="replace"
                  checked={importMode === 'replace'}
                  onChange={(e) => setImportMode(e.target.value)}
                  className="radio radio-primary"
                />
                <span className="label-text ml-2">Replace - Replace all existing data</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}

export default Dashboard