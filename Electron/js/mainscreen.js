/* jshint esversion: 6 */
const ipcRenderer = require('electron').ipcRenderer
const fs = require('fs')
console.log('Main Screen Initialized!')
var plant;

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
  let basePath = __dirname.split('Electron')[0] + 'Electron'
  let date = new Date().toLocaleDateString()
  let newLine = date + ': ' + message
  fs.appendFile(basePath + '/txt/logs.txt', newLine, function(err, data) {
    console.log('log added')
  })
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
  fs.readFile('./txt/selectedPlant.txt', 'utf8', function(err, data) {
    data = data.split(',')
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
  })

  document.getElementById('humedad').textContent = arg.humedad + '%'
  document.getElementById('temperatura').textContent = arg.temperatura + 'ºC'
  document.getElementById('radiacion').textContent = arg.radiacion
  document.getElementById('nivelEstanque').textContent = arg.nivelEstanque + ' de XX m3'

  checkData(arg, plant)
})

ipcRenderer.on('board-data', (event, arg) => {
  setStatus(arg.type, arg.message)
})

function checkData(data, plant) {
  var date = new Date().toLocaleDateString()
  if (data.humedad < plant.minH) {
    ipcRenderer.send('alerta', 'humedad');
    setAlert('danger', date + ' Humedad demasiado baja')
  } else if (data.humedad > plant.maxH) {
    setAlert('danger', date + ' Humedad demasiado alta')
  } else if (data.temperatura < plant.minT) {
    setAlert('danger', date + ' Temperatura demasiado baja')
  } else if (data.temperatura > plant.maxT) {
    setAlert('danger', date + ' Temperatura demasiado alta')
  } else if (data.radiacion < plant.minL) {
    setAlert('danger', date + ' Radiación demasiado baja')
  } else if (data.radiacion > plant.maxL) {
    setAlert('danger', date + ' Radiación demasiado alta')
  } else {
    setAlert('ok', 'No hay alertas')
  }
}

createNavbar('dashboard')

window.onload = async function() {
  var plant
  let basePath = __dirname.split('Electron')[0] + 'Electron'
}
