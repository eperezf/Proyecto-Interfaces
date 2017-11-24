const fs = require('fs');

window.onload = function () {  
  let basePath = __dirname.split('Electron')[0] + 'Electron'
  
  let addNewPlantBtn = document.getElementById('addNewPlantBtn')
  
  addNewPlantBtn.addEventListener('click', () => {
    let name = document.getElementById('plantName').value
    let scientificName = document.getElementById('plantScientificName').value
    let image = document.getElementById('plantImage')
    
    // Validation
    if (!validateNewPlant(name, scientificName, image)) {
      alert("Some fields are empty")
      return
    }
    let newPlant = '\n' + name + ',' + scientificName + ',' + image.files[0].name
    
    fs.appendFile(basePath + '/txt/plants.txt', newPlant, function (err,data) {
      if (err) {
        return console.log(err);
      }
      fs.writeFile(basePath + '/img/' + image.files[0].name, image.files[0], function (err,data) {
        if (err) {
          return console.log(err);
        }
      })
      alert('new plant saved')
      remote
        .getCurrentWindow()
        .loadURL(
          'file://' + __dirname.split('Electron')[0] + 'Electron/Pages/Plants/index.html'
        )
    })
  })
}
function validateNewPlant(name, scname, image) {
  console.log();
  if (name == '' || name == " " || name == null || name == undefined){
    return false
  }
  if (scname == '' || scname == " " || scname == null || scname == undefined) {
    return false
  }
  if (image == '' || image == " " || image == null || image == undefined) {
    return false
  }
  if (image.files[0] == undefined) {
    return false
  }
  return true
}