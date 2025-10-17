// src/components/ui/Modal.jsx
import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

const Modal = ({ 
  isOpen, 
  title, 
  onClose, 
  onConfirm, 
  confirmLabel = 'Confirm', 
  cancelLabel = 'Cancel',
  children,
  size = 'md',
  confirmVariant = 'primary',
  showConfirm = true
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`bg-base-100 rounded-xl shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-base-300">
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {children}
            </div>
            
            <div className="p-6 border-t border-base-300 flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>
                {cancelLabel}
              </Button>
              {showConfirm && (
                <Button variant={confirmVariant} onClick={onConfirm}>
                  {confirmLabel}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal