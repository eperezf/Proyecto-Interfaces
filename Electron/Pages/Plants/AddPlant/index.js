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
  let plantMinPh = document.getElementById('plantMinPh')
  let plantMaxPh = document.getElementById('plantMaxPh')
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
            min: plantMinPh.value,
            max: plantMaxPh.value
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
      plantMinPh.value +
      ',' +
      plantMaxPh.value +
      ',' +
      image.files[0].name
    fs.appendFile(basePath + '/txt/plants.txt', newPlant, function(err, data) {
      if (err) {
        return console.log(err)
      }
      alert('new plant saved')
      // fs.writeFile(
      //   basePath + '/img/test.png',
      //   image.files[0].getContext('2d'),
      //   {encoding: 'binary'},
      //   function(err, data) {
      //     console.log(data)
      //   }
      // )
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
    console.log(pair)
    if (pair.min == '' || pair.min == ' ' || pair.min == null || pair.min == undefined) {
      console.log(pair.min)
      console.log('e')
      return false
    }
    if (pair.max == '' || pair.max == ' ' || pair.max == null || pair.max == undefined) {
      console.log(pair.max)
      console.log('j')
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
