import React from 'react'

type Activity = { title: string; description: string; type?: string }

export default function ActivityList({ activities = [] }: { activities?: Activity[] }) {
  return (
    <div className="space-y-3">
      {activities.map((a, i) => (
        <div key={i} className="p-3 bg-white rounded shadow">
          <div className="font-medium">{a.title}</div>
          <div className="text-sm text-gray-500">{a.description}</div>
        </div>
      ))}
    </div>
  )
}
