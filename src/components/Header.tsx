import React from 'react'

export default function Header() {
  return (
    <header className="w-full bg-brand-navy text-white p-4" style={{ gridArea: 'header' }}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <i className="fas fa-dragon text-2xl text-brand-green"></i>
          <div>
            <h1 className="text-lg font-semibold">CRM Monster</h1>
            <div className="text-sm text-white/80">Ultimate HubSpot Automation</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative">
            <i className="fas fa-bell"></i>
            <span className="absolute -top-1 -right-1 bg-brand-orange text-white rounded-full text-xs px-1">3</span>
          </button>
          <div className="flex items-center gap-2">
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMwQjk0NDQiLz4KPHRleHQgeD0iMjAiIHk9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIj5VPC90ZXh0Pgo8L3N2Zz4K" alt="User" className="w-8 h-8 rounded-full" />
            <span className="text-sm">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  )
}
