const fs = require('fs')

window.onload = function() {
  let basePath = __dirname.split('Electron')[0] + 'Electron'

  let addNewPlantBtn = document.getElementById('addNewPlantBtn')
  let backToPlantsBtn = document.getElementById('backToPlantsBtn')
  let name = document.getElementById('plantName')
  let scientificName = document.getElementById('plantScientificName')
  let plantMinHumidity = document.getElementById('plantMinHumidity')
  let plantMaxHumidity = document.getElementById('plantMaxHumidity')
  let plantMinTemperature = document.getElementById('plantMinTemperature')
  let plantMaxTemperature = document.getElementById('plantMaxTemperature')
  let plantMinUv = document.getElementById('plantMinUv')
  let plantMaxUv = document.getElementById('plantMaxUv')
  let image = document.getElementById('plantImage')

  addNewPlantBtn.addEventListener('click', () => {
    // Validation
    if (
      !validateNewPlant(
        [name.value, scientificName.value],
        [
          {
            min: plantMinHumidity.value,
            max: plantMaxHumidity.value
          },
          {
            min: plantMinTemperature.value,
            max: plantMaxTemperature.value
          },
          {
            min: plantMinUv.value,
            max: plantMaxUv.value
          }
        ],
        image
      )
    ) {
      alert('Some fields are empty')
      return
    }
    let newPlant =
      '\n' +
      name.value +
      ',' +
      scientificName.value +
      ',' +
      plantMinHumidity.value +
      ',' +
      plantMaxHumidity.value +
      ',' +
      plantMinTemperature.value +
      ',' +
      plantMaxTemperature.value +
      ',' +
      plantMinUv.value +
      ',' +
      plantMaxUv.value +
      ',' +
      image.files[0].name
    fs.appendFile(basePath + '/txt/plants.txt', newPlant, function(err, data) {
      if (err) {
        return console.log(err)
      }
      alert('new plant saved, please import img to img dir with same name')
      remote
        .getCurrentWindow()
        .loadURL('file://' + __dirname.split('Electron')[0] + 'Electron/Pages/Plants/index.html')
    })
  })
  backToPlantsBtn.addEventListener('click', () => {
    remote
      .getCurrentWindow()
      .loadURL('file://' + __dirname.split('Electron')[0] + 'Electron/Pages/Plants/index.html')
  })
}

function validateNewPlant(textArray, numberPairArray, image) {
  for (let text of textArray) {
    if (text == '' || text == ' ' || text == null || text == undefined) {
      console.log('here')
      return false
    }
  }
  for (let pair of numberPairArray) {
    if (pair.min == '' || pair.min == ' ' || pair.min == null || pair.min == undefined) {
      return false
    }
    if (pair.max == '' || pair.max == ' ' || pair.max == null || pair.max == undefined) {
      console.log(pair.max)
      return false
    }
    if (parseFloat(pair.min) >= parseFloat(pair.max)) {
      return false
    }
  }

  if (image == '' || image == ' ' || image == null || image == undefined) {
    return false
  }
  if (image.files[0] == undefined) {
    return false
  }
  return true
}

function onFileSelected(event) {
  var selectedFile = event.target.files[0]
  var reader = new FileReader()

  var imgtag = document.getElementById('myImage')
  imgtag.title = selectedFile.name

  reader.onload = function(event) {
    imgtag.src = event.target.result
  }

  reader.readAsDataURL(selectedFile)
}
