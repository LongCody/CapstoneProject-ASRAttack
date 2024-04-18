const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { contextBridge, ipcMain, ipcRenderer, shell, dialog } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: __dirname + '/media/icon.png',
    title: "ASR Attack",
    webPreferences: {
      nodeIntegration: true,
      //contextIsolation: true,
      preload: path.join(__dirname, "./preload.js"),
    }
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("loadRpi", () => {
  shell.openExternal("file://windows/explorer.exe"); //test code to see if button call event works:: remove and insert full code when working
});
