import React from 'react'
import ToolRunner from '../components/ToolRunner'

export type ToolConfig = {
  id: string
  title: string
  description?: string
  render: (props: { onComplete: (res?: any) => void }) => React.ReactNode
}

export function BulkImportTool({ onComplete }: { onComplete: (r?: any) => void }) {
  return (
    <div className="tool-bulk-import">
      <h3 className="tool-bulk-import__title font-semibold">Bulk Contact Import</h3>
      <p className="tool-bulk-import__desc text-sm text-gray-500 mb-3">Upload a CSV or map fields to create contacts in bulk.</p>
      <div className="tool-bulk-import__runner"><ToolRunner name="Bulk Contact Import" onComplete={onComplete} /></div>
    </div>
  )
}

export function DedupeTool({ onComplete }: { onComplete: (r?: any) => void }) {
  return (
    <div className="tool-dedupe">
      <h3 className="tool-dedupe__title font-semibold">Duplicate Detection</h3>
      <p className="tool-dedupe__desc text-sm text-gray-500 mb-3">Scan contacts to find potential duplicates using fuzzy matching.</p>
      <div className="tool-dedupe__runner"><ToolRunner name="Duplicate Detection" onComplete={onComplete} /></div>
    </div>
  )
}

export function AutomationTool({ onComplete }: { onComplete: (r?: any) => void }) {
  return (
    <div className="tool-automation">
      <h3 className="tool-automation__title font-semibold">Automation Builder</h3>
      <p className="tool-automation__desc text-sm text-gray-500 mb-3">Validate and deploy workflow automations safely.</p>
      <div className="tool-automation__runner"><ToolRunner name="Automation Builder" onComplete={onComplete} /></div>
    </div>
  )
}

export const ToolRegistry: ToolConfig[] = [
  {
    id: 'bulk-import',
    title: 'Bulk Import',
    description: 'Import contacts from CSV',
    render: ({ onComplete }) => <BulkImportTool onComplete={onComplete} />
  },
  {
    id: 'dedupe',
    title: 'Duplicate Detection',
    description: 'Find and merge duplicate contacts',
    render: ({ onComplete }) => <DedupeTool onComplete={onComplete} />
  },
  {
    id: 'automation',
    title: 'Automation Builder',
    description: 'Deploy workflow automations',
    render: ({ onComplete }) => <AutomationTool onComplete={onComplete} />
  }
]

export default ToolRegistry
