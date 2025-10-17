// src/components/ui/Table.jsx
import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

const Table = ({ 
  columns, 
  data, 
  onSort,
  onRowClick,
  className = ''
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    onSort?.(key, direction)
  }

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
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
  }, [data, sortConfig])

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                className={`cursor-pointer hover:bg-base-200 transition-colors ${column.className || ''}`}
                onClick={() => column.sortable !== false && handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.title}
                  {column.sortable !== false && (
                    <span className="text-xs opacity-60">
                      {sortConfig.key === column.key ? 
                        (sortConfig.direction === 'asc' ? '↑' : '↓') : 
                        '↕'
                      }
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={onRowClick ? 'cursor-pointer hover:bg-base-200' : ''}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
      
      {sortedData.length === 0 && (
        <div className="text-center py-8 text-base-content/60">
          No data found
        </div>
      )}
    </div>
  )
}

export default Table