const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
require('./app');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1150,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    mainWindow.loadURL('http://localhost:1337');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('resize', (e, x, y) => {
    mainWindow.setSize(x, y);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.handle('open-dir-dialog', () => {
    dialog.showOpenDialog({ properties: ['openDirectory'] }).then((re) => {
        mainWindow.webContents.send('the-path', re.filePaths[0]);
    });
});
