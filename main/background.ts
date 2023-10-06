import { app } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import { setupTitlebar, attachTitlebarToWindow } from "custom-electron-titlebar/main";

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  setupTitlebar();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    autoHideMenuBar: true,
  })

  attachTitlebarToWindow(mainWindow);

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})
