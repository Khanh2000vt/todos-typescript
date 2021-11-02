// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const fs = require('fs')

require('@electron/remote/main').initialize()
// const path = require('path')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  win.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
  )

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  win.webContents.on('dom-ready', () => {
    fs.readFile(path.join(__dirname, 'logo192.png'), 'utf8', (err, data) => {
      if (err) throw err
      win.webContents.executeJavaScript(`
        var doc = new DOMParser().parseFromString(
          '${data}',
          'application/xml')
        var svgHolder = document.getElementById('svgtest') // is just a <div>
        svgHolder.appendChild(svgHolder.ownerDocument.importNode(doc.documentElement, true))
      `)
    })
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.