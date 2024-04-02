const {
  app,
  BrowserWindow,
  screen: electronScreen,
  Tray,
  Menu,
} = require("electron");
const path = require("path");
const { initializeSettings, IS_WINDOW_HIDDEN } = require("./settings");

const { setItem, getItem, getSettings } = initializeSettings(app);

let mainWindow;
let tray;

const createMainWindow = () => {
  const show = !getItem(IS_WINDOW_HIDDEN);

  mainWindow = new BrowserWindow({
    width: 400,
    height: 720,
    show,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      webSecurity: false,
    },
  });
  // const startURL = `file://${path.join(
  //   __dirname,
  //   "./static/build/index.html"
  // )}`;

  mainWindow.setMenuBarVisibility(false);

  mainWindow.loadFile("./static/build/index.html");

  createTray();

  // mainWindow.once("ready-to-show", () => {mainWindow.show()});

  mainWindow.on("closed", () => {
    mainWindow = null;
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
