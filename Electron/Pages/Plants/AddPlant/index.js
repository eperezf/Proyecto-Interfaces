const fs = require('fs');

window.onload = function () {  
  let basePath = __dirname.split('Electron')[0] + 'Electron'
  
  let addNewPlantBtn = document.getElementById('addNewPlantBtn')
  let name = document.getElementById('plantName')
  let scientificName = document.getElementById('plantScientificName')
  let image = document.getElementById('plantImage')
  addNewPlantBtn.addEventListener('click', () => {
    // Validation
    if (!validateNewPlant(name.value, scientificName.value, image)) {
      alert("Some fields are empty")
      return
    }
    let newPlant = '\n' + name.value + ',' + scientificName.value + ',' + image.files[0].name
    
    fs.appendFile(basePath + '/txt/plants.txt', newPlant, function (err,data) {
      if (err) {
        return console.log(err);
      }
      alert('new plant saved')
      fs.writeFile(basePath + '/img/test.png', image.files[0].getContext('2d'), {encoding: 'binary'}, function (err, data) {
        console.log(data);
      })
      remote
        .getCurrentWindow()
        .loadURL(
          'file://' + __dirname.split('Electron')[0] + 'Electron/Pages/Plants/index.html'
        )
    })
  })
}

function validateNewPlant(name, scname, image) {
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

function onFileSelected(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("myImage");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
}
