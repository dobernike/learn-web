const { app, BrowserWindow } = require('electron');
// const url = require('url');

let win = null;

function boot() {
  //   console.log(process.type);
  win = new BrowserWindow({
    width: 600,
    height: 400,
    frame: false,
    // resizable: false,
  });
  //   win.loadURL(
  //     url.format({
  //       pathname: 'index.html',
  //       slashes: true,
  //     })
  //   );
  win.loadURL(`file://${__dirname}/index.html`);

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
}

app.on('ready', boot);
