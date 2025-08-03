const { app, BrowserWindow, Menu, ipcMain } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const window = new BrowserWindow({
    width: 1300,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
  })

  // const menu = Menu.buildFromTemplate(menuTemplate);
  window.loadFile(path.join(__dirname, 'dist', 'index.html'))
  Menu.setApplicationMenu(null);
}


app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})