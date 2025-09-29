import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import StatsCard from '../components/StatsCard'
import ActivityList from '../components/ActivityList'

export default function Dashboard() {
  const { hubspotData } = useContext(AppContext)
  const activities = [
    { title: 'Bulk import completed', description: '2,847 contacts imported successfully', type: 'success' },
    { title: 'Duplicates detected', description: '47 potential duplicates need review', type: 'warning' }
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Contacts" value={hubspotData.contacts.toLocaleString()} />
        <StatsCard title="Active Deals" value={hubspotData.deals.toLocaleString()} />
        <StatsCard title="Duplicates" value={hubspotData.duplicates.toLocaleString()} />
        <StatsCard title="Workflows" value={hubspotData.workflows.toLocaleString()} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-4">
            <h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
            <ActivityList activities={activities} />
          </div>
        </div>
      </div>
    </div>
  )
}
