const {remote} = require('electron')
function renderNavbar(active) {
  return new Promise((resolve, reject) => {
    let homeClass = active == 'dashboard' ? 'nav-link active' : 'nav-link'
    let plantsClass = active == 'plants' ? 'nav-link active' : 'nav-link'
    let sysClass = active == 'sys' ? 'nav-link active' : 'nav-link'
    var strVar = ''
    strVar += '<nav class="navbar navbar-expand navbar-dark bg-dark">'
    strVar += '    <span class="navbar-brand mb-0 h1">PlantControl</span>'
    strVar += '    <ul class="navbar-nav mr-auto">'
    strVar += '      <li class="nav-item" id="dashboardLink">'
    strVar += '        <a class="' + homeClass + '" href="#">Dashboard</a>'
    strVar += '      </li>'
    strVar += '      <li class="nav-item" id="plantsConfigLink">'
    strVar +=
      '        <a class="' +
      plantsClass +
      '" href="#">Conf planta <span class="sr-only">(current)</span></a>'
    strVar += '      </li>'
    strVar += '      <li class="nav-item" id="sysConfigLink">'
    strVar += '        <a class="' + sysClass + '" href="#">Conf sistema</a>'
    strVar += '      </li>'
    strVar += '    </ul>'
    strVar += '  </nav>'
    let navbarDiv = document.getElementById('navbar')
    navbarDiv.innerHTML = strVar
    resolve()
  })
}
function createNavbar(active) {
  renderNavbar(active).then(() => {
    let basePath = __dirname.split('Electron')[0] + 'Electron'
    console.log(basePath)
    document.getElementById('dashboardLink').addEventListener('click', () => {
      remote.getCurrentWindow().loadURL('file://' + basePath + '/mainscreen.html')
      console.log(__dirname)
    })
    document.getElementById('plantsConfigLink').addEventListener('click', () => {
      remote.getCurrentWindow().loadURL('file://' + basePath + '/Pages/Plants/index.html')
    })
    document.getElementById('sysConfigLink').addEventListener('click', () => {
      remote.getCurrentWindow().loadURL('file://' + basePath + '/Pages/Settings/index.html')
    })
  })
}
