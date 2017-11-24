const {remote} = require('electron')
const url = require('url')
const path = require('path')

let welcomeSubmitBtn = document.getElementById('welcomeSubmitBtn')

console.log(welcomeSubmitBtn)

welcomeSubmitBtn.addEventListener('click', () => {
  remote.getCurrentWindow().loadURL('file://' + __dirname + '/../../mainscreen.html')
})
