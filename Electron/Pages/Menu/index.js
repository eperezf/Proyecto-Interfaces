let dashboardBtn = document.getElementById('dashboardBtn')
let plantsBtn = document.getElementById('plantsBtn')
let settingsBtn = document.getElementById('settingsBtn')

dashboardBtn.addEventListener('click', () => {
  remote.getCurrentWindow().loadURL('file://' + __dirname + '/../../mainscreen.html')
})

plantsBtn.addEventListener('click', () => {
  remote.getCurrentWindow().loadURL('file://' + __dirname + '/../Plants/index.html')
})

settingsBtn.addEventListener('click', () => {
  remote.getCurrentWindow().loadURL('file://' + __dirname + '/../Settings/index.html')
})
