const { app, BrowserWindow, globalShortcut } = require('electron');
// const url = require('url');

let win = null;

function boot() {
  //   console.log(process.type);
  win = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
    // resizable: false,
  });
  //   win.loadURL(
  //     url.format({
  //       pathname: 'index.html',
  //       slashes: true,
  //     })
  //   );
  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', () => {
    win = null;
  });

  //   win2 = new BrowserWindow({
  //     width: 1000,
  //     height: 500,
  //     resizable: false,
  //     parent: win,
  //   });
  //   win2.loadURL('http://example.com');
  //   win2.on('closed', (_) => {
  //     console.log('win2 was closed');
  //   });

  globalShortcut.register('CommandOrControl+1', () => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });

  // globalShortcut.register('Super+F', () => {
  //   alert('Super key pressed');
  // });

  // globalShortcut.register('Alt+1', () => {
  //   alert('alt key pressed');
  // });
}

app.on('ready', boot);
