const { contextBridge, ipcRenderer } = require("electron");
const { IPC_ACTIONS } = require("./constants.js");

contextBridge.exposeInMainWorld("electronUtilsRender", {
  [IPC_ACTIONS.GAMEPAD_BUTTON_PRESS]: (buttonName) =>
    ipcRenderer.send(IPC_ACTIONS.GAMEPAD_BUTTON_PRESS, buttonName),
  [IPC_ACTIONS.GET_MIN_ON_CLOSE]: () => {
    return ipcRenderer.invoke(IPC_ACTIONS.GET_MIN_ON_CLOSE);
  },
  [IPC_ACTIONS.SET_MIN_ON_CLOSE]: (v) => {
    return ipcRenderer.invoke(IPC_ACTIONS.SET_MIN_ON_CLOSE, v);
  },
});
