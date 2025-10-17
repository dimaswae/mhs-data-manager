// src/components/Pagination.jsx
import React from 'react'
import Button from './ui/Button'

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = '' 
}) => {
  const pages = []
  const maxVisiblePages = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (totalPages <= 1) return null

  return (
    <div className={`flex justify-center items-center gap-2 ${className}`}>
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-sm"
      >
        Previous
      </Button>

      {startPage > 1 && (
        <>
          <Button
            variant="ghost"
            onClick={() => onPageChange(1)}
            className="btn-sm"
          >
            1
          </Button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map(page => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'ghost'}
          onClick={() => onPageChange(page)}
          className="btn-sm"
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <Button
            variant="ghost"
            onClick={() => onPageChange(totalPages)}
            className="btn-sm"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-sm"
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination