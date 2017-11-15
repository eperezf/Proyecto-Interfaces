/* jshint esversion: 6 */
console.log("Main Screen Initialized!");
const { remote } = require('electron')

function setAlert(type, message){
  var alertType;
  if (type == "ok") {
    alertType = "success";
  }
  else if (type == "warning"){
    alertType = "warning";
  }
  else if (type == "danger"){
    alertType = "danger";
  }
  else{
    alertType = "info";
  }
  document.getElementById("alertBox").className = `col bg-${alertType} text-white border border-dark`;
  document.getElementById("alertMessage").textContent = message;
}

function setStatus(type, message){
  var statusType;
  if (type == "ok") {
  statusType = "success";
  }
  else if (type == "warning"){
    statusType = "warning";
  }
  else if (type == "danger"){
    statusType = "danger";
  }
  else{
    statusType = "info";
  }
  document.getElementById("statusBox").className = `col bg-${alertType} text-white border border-dark`;
  document.getElementById("statusMessage").textContent = message;
}
let menuBtn = document.getElementById('menuBtn')
menuBtn.addEventListener('click', () => {
  remote.getCurrentWindow().loadURL('file://' + __dirname + '/Pages/Menu/index.html')
})
