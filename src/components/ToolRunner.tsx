import React, { useEffect } from 'react'
import { useProgress } from '../hooks/useProgress'
import ProgressBar from './ProgressBar'

export default function ToolRunner({ name, onComplete }: { name: string; onComplete?: (result?: any) => void }) {
  const { progress } = useProgress(() => {
    onComplete && onComplete({ ok: true })
  })

  return (
    <div>
      <h3 className="font-semibold mb-2">{name}</h3>
      <ProgressBar value={progress} />
      <div className="mt-2 text-sm text-gray-500">{Math.round(progress)}% complete</div>
    </div>
  )
}
