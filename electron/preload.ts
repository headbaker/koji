// preload.ts
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  app: {
    ping: () => ipcRenderer.invoke('app:ping'),
    onMainProcessMessage: (callback: (message: string) => void) => {
      ipcRenderer.on('main-process-message', (_event, message) => callback(message))
    },
  },

  recipes: {
    getAll: () => ipcRenderer.invoke('recipes:getAll'),
  },
})
