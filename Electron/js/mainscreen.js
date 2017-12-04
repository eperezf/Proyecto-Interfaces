/* jshint esversion: 6 */
const ipcRenderer = require('electron').ipcRenderer
const fs = require('fs')
console.log('Main Screen Initialized!')
var plant

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
  let basePath = __dirname.split('Electron')[0] + 'Electron'
  fs.readFile(basePath + '/txt/selectedPlant.txt', 'utf8', function(err, data) {
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
  var tbox = document.getElementById('temperatura')
  var hbox = document.getElementById('humedadBox')
  var rbox = document.getElementById('radiacionBox')
  var error = false
  if (data.humedad < plant.minH) {
    // ENVIAR DATOS PARA REGAR DESDE ACAAAA
    hbox.classList.add('bg-danger')
    hbox.classList.remove('bg-info')
    setAlert('danger', date + ' Humedad demasiado baja')
    error = true
  }
  if (data.humedad > plant.maxH) {
    hbox.classList.add('bg-danger')
    hbox.classList.remove('bg-info')
    setAlert('danger', date + ' Humedad demasiado alta')
    error = true
  }
  if (data.temperatura < plant.minT) {
    tbox.classList.add('bg-danger')
    tbox.classList.remove('bg-info')
    setAlert('danger', date + ' Temperatura demasiado baja')
    error = true
  }
  if (data.temperatura > plant.maxT) {
    tbox.classList.add('bg-danger')
    tbox.classList.remove('bg-info')
    setAlert('danger', date + ' Temperatura demasiado alta')
    error = true
  }
  if (data.radiacion < plant.minL) {
    rbox.classList.add('bg-danger')
    rbox.classList.remove('bg-info')
    setAlert('danger', date + ' Radiación demasiado baja')
    error = true
  }
  if (data.radiacion > plant.maxL) {
    rbox.classList.add('bg-danger')
    rbox.classList.remove('bg-info')
    setAlert('danger', date + ' Radiación demasiado alta')
    error = true
  }
  if (error) {
    hbox.classList.add('bg-info')
    hbox.classList.remove('bg-danger')
    tbox.classList.add('bg-info')
    tbox.classList.remove('bg-danger')
    rbox.classList.add('bg-info')
    rbox.classList.remove('bg-danger')
    setAlert('ok', 'No hay alertas')
  }
}

createNavbar('dashboard')
