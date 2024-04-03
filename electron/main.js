const {
  app,
  BrowserWindow,
  screen: electronScreen,
  Tray,
  Menu,
  ipcMain,
} = require("electron");
const path = require("path");
const { initializeSettings, IS_WINDOW_HIDDEN } = require("./settings");

const { setItem, getItem, getSettings } = initializeSettings(app);

let mainWindow;
let tray;

const createMainWindow = () => {
  const show = !getItem(IS_WINDOW_HIDDEN);

  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    minWidth: 600,
    minHeight: 600,
    maxWidth: 600,
    maxHeight: 800,
    show,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
      preload: path.join(__dirname, "./preload.js"),
    },
  });
  // const startURL = `file://${path.join(
  //   __dirname,
  //   "./static/build/index.html"
  // )}`;

  mainWindow.setMenuBarVisibility(false);

  // mainWindow.webContents.openDevTools();

  mainWindow.loadFile("./static/build/index.html");

  createTray();

  // mainWindow.once("ready-to-show", () => {mainWindow.show()});

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  ipcMain.on("gamepadButtonPress", (_, buttonName) => {
    handleGamepadButtonPress(mainWindow, buttonName);
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function createTray() {
  tray = new Tray(path.join(__dirname, "./favicon/favicon-32x32.png"));

  const contextMenu = createContextMenu();

  tray?.setToolTip("SimpleDeckyTDP Desktop");
  tray?.setContextMenu(contextMenu);
}

function createContextMenu() {
  const toggleWindow = () => {
    const windowIsVisible = mainWindow.isVisible();
    if (windowIsVisible) {
      mainWindow.hide();
      setItem(IS_WINDOW_HIDDEN, true);
    } else {
      mainWindow.show();
      setItem(IS_WINDOW_HIDDEN, false);
    }
  };

  const contextMenu = Menu.buildFromTemplate([
    { label: "Toggle Window", click: toggleWindow },
    { label: "Quit", click: () => app.quit() },
  ]);

  return contextMenu;
}

function handleGamepadButtonPress(mainWindow, buttonName) {
  if (buttonName === "bButton") {
    mainWindow.webContents.sendInputEvent({
      type: "keyDown",
      keyCode: "escape",
    });
    mainWindow.webContents.sendInputEvent({ type: "keyUp", keyCode: "escape" });
  }
  if (buttonName === "aButton") {
    mainWindow.webContents.sendInputEvent({
      type: "keyDown",
      keyCode: "space",
    });
    mainWindow.webContents.sendInputEvent({ type: "keyUp", keyCode: "space" });
  }
  if (buttonName === "dPadDown") {
    mainWindow.webContents.sendInputEvent({
      type: "keyDown",
      keyCode: "tab",
    });
    mainWindow.webContents.sendInputEvent({ type: "keyUp", keyCode: "tab" });
  }
  if (buttonName === "dPadUp") {
    mainWindow.webContents.sendInputEvent({
      type: "keyDown",
      keyCode: "shift",
    });
    mainWindow.webContents.sendInputEvent({
      type: "keyDown",
      keyCode: "tab",
      modifiers: ["shift"],
    });
    mainWindow.webContents.sendInputEvent({
      type: "keyUp",
      keyCode: "tab",
      modifiers: ["shift"],
    });
    mainWindow.webContents.sendInputEvent({
      type: "keyUp",
      keyCode: "shift",
    });
  }
  if (buttonName == "dPadLeft") {
    mainWindow.webContents.sendInputEvent({
      type: "keyDown",
      keyCode: "left",
    });
    mainWindow.webContents.sendInputEvent({ type: "keyUp", keyCode: "left" });
  }
  if (buttonName == "dPadRight") {
    mainWindow.webContents.sendInputEvent({
      type: "keyDown",
      keyCode: "right",
    });
    mainWindow.webContents.sendInputEvent({ type: "keyUp", keyCode: "right" });
  }
  if (buttonName == "up") {
    mainWindow.webContents.sendInputEvent({
      type: "keyDown",
      keyCode: "up",
    });
    mainWindow.webContents.sendInputEvent({ type: "keyUp", keyCode: "up" });
  }
  if (buttonName == "down") {
    mainWindow.webContents.sendInputEvent({
      type: "keyDown",
      keyCode: "down",
    });
    mainWindow.webContents.sendInputEvent({ type: "keyUp", keyCode: "down" });
  }
}
