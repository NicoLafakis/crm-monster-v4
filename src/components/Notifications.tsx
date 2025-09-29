import React from 'react'

export default function Notifications({ items = [] }: { items?: Array<{ id: string; message: string; type?: string }> }) {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {items.map(i => (
        <div key={i.id} className={`p-3 rounded shadow ${i.type === 'error' ? 'bg-red-100' : 'bg-white'}`}>
          {i.message}
        </div>
      ))}
    </div>
  )
}
