const { contextBridge, ipcMain, ipcRenderer} = require('electron')

let indexBridge = {   
    loadRPI: async () => {
        await ipcRenderer.invoke("loadRpi");
    },
}

contextBridge.exposeInMainWorld("indexBridge", indexBridge);