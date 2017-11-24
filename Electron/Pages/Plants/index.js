const { remote } = require('electron')


let table = document.getElementById('plantsTableBody')


// Connect to DB

let plants = [
  {
    name: 'Tomates',
    attr_1: 'asdf',
    attr_2: 'qwerty'
  },
  {
    name: 'Lechugas',
    attr_1: 'asdf',
    attr_2: 'qwerty'
  }
]

for (let plant of plants) {
  let tr = document.createElement('tr')
  tr.innerHTML ='<td>1</td><td>' + plant.name + '</td><td>cell2</td><td>cell2</td>'
  table.appendChild(tr)
}

createNavbar('plants')
