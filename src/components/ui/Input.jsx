// src/components/ui/Input.jsx
import React from 'react'

const Input = React.forwardRef(({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`form-control w-full ${className}`}>
      {label && (
        <label className="label" htmlFor={name}>
          <span className="label-text font-medium">{label}</span>
        </label>
      )}
      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input