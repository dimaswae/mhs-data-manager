// src/components/ui/Button.jsx
import React from 'react'
import { motion } from 'framer-motion'

const Button = React.forwardRef(({ 
  children, 
  onClick, 
  variant = 'primary', 
  type = 'button', 
  disabled = false,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'btn font-medium transition-all duration-200'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-error',
    ghost: 'btn-ghost'
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${disabled ? 'btn-disabled' : ''} ${className}`

  return (
    <motion.button
      ref={ref}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'

export default Button