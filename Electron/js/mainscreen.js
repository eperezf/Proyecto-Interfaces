/* jshint esversion: 6 */
const ipcRenderer = require('electron').ipcRenderer
const fs = require('fs')
console.log('Main Screen Initialized!')

function setAlert(type, message) {
  var alertType
  if (type == 'ok') {
    alertType = 'success'
  } else if (type == 'warning') {
    alertType = 'warning'
  } else if (type == 'danger') {
    alertType = 'danger'
  } else {
    alertType = 'info'
  }
  document.getElementById(
    'alertBox'
  ).className = `col bg-${alertType} text-white border border-dark`
  document.getElementById('alertMessage').textContent = message
}

function setStatus(type, message) {
  var statusType
  if (type == 'ok') {
    statusType = 'success'
  } else if (type == 'warning') {
    statusType = 'warning'
  } else if (type == 'danger') {
    statusType = 'danger'
  } else {
    statusType = 'info'
  }
  document.getElementById(
    'statusBox'
  ).className = `col bg-${statusType} text-white border border-dark`
  document.getElementById('statusMessage').textContent = message
}

ipcRenderer.on('sensor-data', (event, arg) => {
  document.getElementById('humedad').textContent = arg.humedad + '%'
  document.getElementById('temperatura').textContent = arg.temperatura + 'ºC'
  document.getElementById('radiacion').textContent = arg.radiacion
  document.getElementById('nivelEstanque').textContent = arg.nivelEstanque + ' de XX m3'
  checkData(arg.data)
})

ipcRenderer.on('board-data', (event, arg) => {
  setStatus(arg.type, arg.message)
})

function checkData(data) {
  if (data > 800) {
    setAlert('danger', 'Radiación demasiado alta')
  } else {
    setAlert('ok', 'No hay alertas')
  }
}

createNavbar('dashboard')

window.onload = async function() {
  var plant
  let basePath = __dirname.split('Electron')[0] + 'Electron'
  await fs.readFile(basePath + '/txt/selectedPlant.txt', 'utf8', function(err, data) {
    data = data.split(',')
    console.log(data)
    plant = {
      name: data[0],
      scName: data[1],
      minH: data[2],
      maxH: data[3],
      minT: data[4],
      maxT: data[5],
      minL: data[6],
      maxL: data[7]
    }
    // CREAR ALERTAS ACAAAAA
    console.log(plant)
  })
}
