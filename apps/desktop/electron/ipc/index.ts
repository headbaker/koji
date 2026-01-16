import { ipcMain } from 'electron'

export function registerIpcHandlers() {
  ipcMain.handle('app:ping', async () => {
    return 'pong from main'
  })
}
