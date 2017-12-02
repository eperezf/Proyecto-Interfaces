const fs = require('fs')

window.onload = async function() {
  let basePath = __dirname.split('Electron')[0] + 'Electron'
  let saveBtn = document.getElementById('saveBtn')
  let selectedPlantSelect = document.getElementById('selectedPlantSelect')
  await fs.readFile(basePath + '/txt/plants.txt', 'utf8', function(err, data) {
    data = data.split('\n')
    for (let plant of data) {
      plant = plant.split(',')[0]
      let option = document.createElement('option')
      option.value = plant
      option.text = plant
      selectedPlantSelect.appendChild(option)
    }
    selectedPlantSelect.value = 'Sunflower'
    selectedPlantSelect.addEventListener('change', () => {
      saveBtn.className = 'btn btn-primary'
      saveBtn.addEventListener('click', () => {
        fs.writeFile(basePath + '/txt/selectedPlant.txt', selectedPlantSelect.value, function() {
          remote
            .getCurrentWindow()
            .loadURL(
              'file://' + __dirname.split('Electron')[0] + 'Electron/Pages/Settings/index.html'
            )
        })
      })
    })
  })
  createNavbar('sys')
}
