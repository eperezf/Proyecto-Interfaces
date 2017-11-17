const { remote } = require('electron')


let menuBtn = document.getElementById('menuBtn')


menuBtn.addEventListener('click', () => {
  remote.getCurrentWindow().loadURL('file://' + __dirname + '/../Menu/index.html')
})
