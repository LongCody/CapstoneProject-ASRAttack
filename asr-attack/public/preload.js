const { contextBridge, ipcMain, ipcRenderer } = require('electron');

const indexBridge = require('./pages/Try_Preload')

if (location.href.endsWith('Try.js')) {
  Bridge = indexBridge
}
contextBridge.exposeInMainWorld('Bridge', Bridge)