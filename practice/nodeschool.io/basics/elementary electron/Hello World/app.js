var electron = require('electron');

const url = 'file://' + __dirname + '/index.html';

electron.app.on('ready', function () {
  var mainWindow = new electron.BrowserWindow({ width: 600, height: 800 });
  mainWindow.loadURL(url);
});