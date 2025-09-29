import React from 'react'

type Props = {
  title?: string
  children?: React.ReactNode
  onClose?: () => void
}

export default function Modal({ title, children, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg overflow-hidden">
        <div className="p-4 bg-brand-navy text-white flex justify-between items-center">
          <h3 className="text-lg">{title}</h3>
          <button onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
