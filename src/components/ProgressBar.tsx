import React from 'react'

export default function ProgressBar({ value = 0 }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div className="h-3 bg-brand-green transition-all" style={{ width: `${Math.round(value)}%` }} />
    </div>
  )
}
