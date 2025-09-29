import React, { createContext, useState } from 'react'
import ToolRunner from '../components/ToolRunner'
import ToolRegistry, { ToolConfig } from '../tools/ToolRegistry'


type HubspotData = {
  contacts: number
  deals: number
  companies: number
  duplicates: number
  workflows: number
}

type AppContextType = {
  hubspotData: HubspotData
  currentSection?: string
  setCurrentSection?: (s: string) => void
  executeTool?: (name: string) => void
  notifications?: Notification[]
  activities?: Activity[]
  addActivity?: (a: Activity) => void
  addNotification?: (m: string, t?: string) => void
}

const initialData: HubspotData = {
  contacts: 12847,
  deals: 1256,
  companies: 3420,
  duplicates: 47,
  workflows: 23
}

const noop = () => {}
export const AppContext = createContext<AppContextType>({
  hubspotData: initialData,
  executeTool: noop,
  notifications: [],
  activities: [],
  addActivity: noop as any,
  addNotification: noop as any
})

type Notification = { id: string; message: string; type?: string }
type Activity = { title: string; description: string; type?: string }

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  const [hubspotData] = useState<HubspotData>(initialData)
  const [currentSection, setCurrentSection] = useState<string>('dashboard')
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activities, setActivities] = useState<Activity[]>([])

  function executeTool(name: string) {
    // find tool by id
    const tool = ToolRegistry.find(t => t.id === name || t.title === name)
    if (tool) {
      setModalContent(
        tool.render({
          onComplete: (res?: any) => {
            setModalOpen(false)
            const activity: Activity = { title: `${tool.title} completed`, description: 'Operation executed successfully', type: 'success' }
            setActivities((a: Activity[]) => [activity, ...a].slice(0, 5))
            const id = String(Date.now())
            setNotifications((n: Notification[]) => [{ id, message: `${tool.title} finished`, type: 'success' }, ...n].slice(0, 5))
          }
        })
      )
    } else {
      // fallback: show generic runner
      setModalContent(
        <ToolRunner
          name={name}
          onComplete={() => {
            setModalOpen(false)
            const activity: Activity = { title: `${name} completed`, description: 'Operation executed successfully', type: 'success' }
            setActivities((a: Activity[]) => [activity, ...a].slice(0, 5))
            const id = String(Date.now())
            setNotifications((n: Notification[]) => [{ id, message: `${name} finished`, type: 'success' }, ...n].slice(0, 5))
          }}
        />
      )
    }
    setModalOpen(true)
  }

  function getToolById(id: string): ToolConfig | undefined {
    return ToolRegistry.find(t => t.id === id)
  }

  function addActivity(activity: Activity) {
    setActivities((a: Activity[]) => [activity, ...a].slice(0, 5))
  }

  function addNotification(message: string, type?: string) {
    const id = String(Date.now())
    setNotifications((n: Notification[]) => [{ id, message, type }, ...n].slice(0, 5))
    // auto-dismiss
    setTimeout(() => {
      setNotifications((n: Notification[]) => n.filter(x => x.id !== id))
    }, 4000)
  }

  function removeNotification(id: string) {
    setNotifications((n: Notification[]) => n.filter(x => x.id !== id))
  }

  return (
    <AppContext.Provider value={{ hubspotData, currentSection, setCurrentSection, executeTool, notifications, activities, addActivity, addNotification }}>
      {children}
      {/* Modal rendering point can be lifted to a dedicated provider or portal */}
      {modalOpen && (
        <div className="app-modal fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="app-modal__content bg-white p-4 rounded-lg max-w-xl w-full">{modalContent}</div>
        </div>
      )}
      {/* Notifications */}
      <div className="app-notifications fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((n: Notification) => (
          <div
            key={n.id}
            className={`notification-item notification-item--${n.type || 'info'} p-3 rounded shadow ${n.type === 'error' ? 'bg-red-100' : 'bg-white'}`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  )
}
