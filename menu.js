const {app, Menu, Notification, Tray} = require('electron')
const os = require('os')


const template = [
    {
    label: 'File',
    submenu: [
        {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click(item, focusedWindow) {
                if (focusedWindow) focusedWindow.reload()
            }
        },
        {
            label: 'Quit',
            accelerator: 'CmdOrCtrl+Q',
            click() {
                app.quit()
            }
        }
    ]
},
{
    label: 'Tools',
    submenu: [{
        label: 'Dev Tools',
        accelerator: process.platform === 'darwin' ? 'Cmd+Shift+I' : 'Alt+I',
        click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools()
        }
    }, 
    {
        label: 'Show Free Memory',
        accelerator: 'CmdOrCtrl+F',
        click() {
            let freeMem = String(os.freemem())
            let notification = new Notification({
                title: 'Memory',
                body:'You Have ' + freeMem.substring(0,4) + ' mb free memory'
            })
            notification.show()
        }
    }]
}]

if (process.platform === 'darwin') {
    template.unshift({})
}


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)


const tray = new Tray('./static/favicon.ico')

const trayMenu = Menu.buildFromTemplate([
    {label: 'Options', type: 'radio'},
    {label: 'Exit', click(){ app.quit()}}
])

tray.setToolTip('Bookstore Native Application')
tray.setContextMenu(trayMenu)