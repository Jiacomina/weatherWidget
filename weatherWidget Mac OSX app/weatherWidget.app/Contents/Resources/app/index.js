const electron = require('electron')
process.env.GOOGLE_API_KEY = 'AIzaSyAJreChh6ZMzaUqqyI8_LvvQEofPTVfaqg'

const {app, BrowserWindow} = electron;
const Menu = electron.Menu;
const template = [
    {
        label: 'Electron',
        submenu: [
            { label: 'About ...',
              click () { require('electron').shell.openExternal('https://github.com/Jiacomina/weatherWidget') }
            },
            {
              label: 'Quit',
              accelerator: "CmdOrCtrl+Q",
              click: () => {
                  app.quit();
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Refresh',
              accelerator: "CmdOrCtrl+R",
              role: 'reload'
            },
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
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
]

app.on('ready', () => {
    let win = new BrowserWindow({
     	width: 400,
     	height: 250,
     	minWidth: 400,
     	minHeight: 250,
     	maxWidth: 400,
     	maxHeight: 250,
     	backgroundColor: '#2e2c29',
     	resizable: false,
      fullscreen: false,
     	frame: false,
     	transparent: true,
     	webPreferences: {
        nodeIntegration: false,
  	  }
    });
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    win.loadURL(`file://${__dirname}/index.html`);
})
