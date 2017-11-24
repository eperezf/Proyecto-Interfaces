const ipcRenderer = require('electron').ipcRenderer
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
  document.getElementById('radiacion').textContent = arg.data
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
