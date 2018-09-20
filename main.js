const {app,BrowserWindow} = require('electron')

function createWindow() {
    let win = new BrowserWindow({width: 800, height: 800})

    win.loadURL('http://localhost:3000')

    win.on('closed', () => {
        win = null
    })

    require('./menu')
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platfrom !== 'darwin') {
        app.quit()
    }
})

app.on('active', () => {
    if(win === null) {
        createWindow()
    }
})