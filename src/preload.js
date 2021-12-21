const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('getDir', {
    dir: () => ipcRenderer.invoke('open-dir-dialog'),
});
ipcRenderer.on('the-path', (event, arg) => {
    if (arg) contextBridge.exposeInMainWorld('path', arg);
});
var barcode = require('barcode');
var code39 = barcode('code39', {
    data: "it works",
    width: 400,
    height: 100,
});

code39.saveImage('outfile.png', function (err) {
    if (err) throw err;

    console.log('File has been written!');
});