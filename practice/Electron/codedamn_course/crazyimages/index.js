const { BrowserWindow, app } = require('electron');

let win;

let boot = () => {
  win = new BrowserWindow({
    width: 700,
    heigth: 500,
    frame: false,
  });

  win.loadURL(`file://${__dirname}/index.html`);

  win.webContents.openDevTools();
};

app.on('ready', boot);
