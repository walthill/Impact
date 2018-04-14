const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const url = require('url')

require('electron-context-menu')({
    showInspectElement: true
});

// A global reference of the window object so the window won't be
// be closed when the JavaScript object is garbage collected.
let win = null

// Menu template
const appMenuTemplate = [
    {
      label: 'View',
        submenu: [
            {role: 'reload'},
            {type: 'separator'},
            {role: 'resetzoom'},
            {role: 'zoomin'},
            {role: 'zoomout'},
            {type: 'separator'},
            {role: 'togglefullscreen'}
        ]
    },
    {
        role: 'window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'}
        ]
    },
    {
        role: 'help',
        submenu: [
            {role: 'toggledevtools'},
			 {type: 'separator'},
            {
              label: 'Learn More',
              click(){require('electron').shell.openExternal('https://github.com/CSI280-S17/Montpelier')}
			  
            },
			{
              label: 'License',
              click(){require('electron').shell.openExternal('https://www.apache.org/licenses/LICENSE-2.0.html')}
			  
            }
        ]
    }
 ]

if (process.platform == 'darwin') {
    var name = app.getName();
    appMenuTemplate.unshift({
        label: name,
        submenu: [
               {
               label: 'Quit',
               accelerator: 'Command+Q',
               click() { app.quit(); }
               },
               ]
        });
}

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        title: 'Impact',
        width: 1000,
        height: 1200,
        icon: __dirname + '/media/logoRedesign.png',
        show: false
    })
    // Allow window to start maximized.
    win.maximize()
    win.show()

    // Load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    // Open the DevTools.
    // win.webContents.openDevTools()

    //Use template to make menu
    const appMenu = Menu.buildFromTemplate(appMenuTemplate)
    Menu.setApplicationMenu(appMenu)

    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
})
