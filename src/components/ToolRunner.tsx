import React, { useEffect } from 'react'
import { useProgress } from '../hooks/useProgress'
import ProgressBar from './ProgressBar'

export default function ToolRunner({ name, onComplete }: { name: string; onComplete?: (result?: any) => void }) {
  const { progress } = useProgress(() => {
    onComplete && onComplete({ ok: true })
  })

  return (
    <div className="tool-runner">
      <h3 className="tool-runner__title font-semibold mb-2">{name}</h3>
      <div className="tool-runner__progress"><ProgressBar value={progress} /></div>
      <div className="tool-runner__status mt-2 text-sm text-gray-500">{Math.round(progress)}% complete</div>
    </div>
  )
}
