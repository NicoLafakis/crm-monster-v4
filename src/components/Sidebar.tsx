import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import ToolRegistry from '../tools/ToolRegistry'

export default function Sidebar() {
  const ctx = useContext(AppContext)
  const items = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'bulk-operations', label: 'Bulk Operations' },
    { id: 'data-management', label: 'Data Management' },
    { id: 'automation', label: 'Automation Builder' }
  ]

  return (
    <aside className="app-sidebar p-4 bg-white border-r">
      <nav className="app-sidebar__nav space-y-2">
        {items.map(i => (
          <div
            key={i.id}
            className={`app-sidebar__nav-item app-sidebar__nav-item--${i.id} cursor-pointer p-2 rounded hover:bg-gray-100`}
            onClick={() => ctx.setCurrentSection && ctx.setCurrentSection(i.id)}
          >
            {i.label}
          </div>
        ))}

        <div className="app-sidebar__tools mt-4">
          <div className="text-sm font-semibold mb-2">Tools</div>
          <div className="space-y-2">
            {ToolRegistry.map(t => (
              <button
                key={t.id}
                className={`tool-button tool-button--${t.id} w-full text-left p-2 rounded`}
                onClick={() => ctx.executeTool && ctx.executeTool(t.id)}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}
