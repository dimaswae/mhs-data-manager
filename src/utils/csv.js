// src/utils/csv.js
export function exportToCSV(data, filename = 'data-manager-mahasiswa.csv') {
  if (!data || data.length === 0) {
    throw new Error('No data to export')
  }

  const headers = ['id', 'nama', 'nim', 'programStudi', 'fakultas', 'email']
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => 
        `"${String(row[header] || '').replace(/"/g, '""')}"`
      ).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function parseCSVFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const text = e.target.result
        const lines = text.split('\n').filter(line => line.trim())
        
        if (lines.length === 0) {
          resolve({ rows: [], errors: ['File is empty'] })
          return
        }

        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
        const expectedHeaders = ['id', 'nama', 'nim', 'programStudi', 'fakultas', 'email']
        
        if (!expectedHeaders.every(h => headers.includes(h))) {
          resolve({ rows: [], errors: ['Invalid CSV format. Expected headers: ' + expectedHeaders.join(', ')] })
          return
        }

        const rows = []
        const errors = []

        for (let i = 1; i < lines.length; i++) {
          try {
            const line = lines[i]
            const values = []
            let current = ''
            let inQuotes = false

            for (let j = 0; j < line.length; j++) {
              const char = line[j]
              
              if (char === '"') {
                inQuotes = !inQuotes
              } else if (char === ',' && !inQuotes) {
                values.push(current.trim())
                current = ''
              } else {
                current += char
              }
            }
            values.push(current.trim())

            const row = {}
            headers.forEach((header, index) => {
              row[header] = values[index] ? values[index].replace(/^"|"$/g, '') : ''
            })

            // Validate required fields
            if (!row.nama || !row.nim || !row.email) {
              errors.push(`Row ${i}: Missing required fields`)
              continue
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(row.email)) {
              errors.push(`Row ${i}: Invalid email format`)
              continue
            }

            rows.push(row)
          } catch (error) {
            errors.push(`Row ${i}: Parse error - ${error.message}`)
          }
        }

        resolve({ rows, errors })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}