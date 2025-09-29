import React from 'react'

type Props = { title: string; value: string }

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="card p-4">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{title}</div>
    </div>
  )
}
