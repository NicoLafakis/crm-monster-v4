import { useEffect, useState, useRef } from 'react'

export function useProgress(onComplete?: () => void) {
  const [progress, setProgress] = useState(0)
  const timer = useRef<number | null>(null)

  useEffect(() => {
    if (progress >= 100) {
      if (timer.current) window.clearInterval(timer.current)
      onComplete && onComplete()
      return
    }

    timer.current = window.setInterval(() => {
      setProgress(p => Math.min(100, p + Math.random() * 20))
    }, 300)

    return () => {
      if (timer.current) window.clearInterval(timer.current)
    }
  }, [progress, onComplete])

  return { progress, setProgress }
}
