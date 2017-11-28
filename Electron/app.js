/* jshint esversion: 6 */

const {app, BrowserWindow, Menu, ipcMain, dialog} = require('electron');
const path = require('path');
const url = require('url');
const SerialPort = require('serialport');
const storage = require('electron-json-storage');
const dataPath = storage.getDataPath();
console.log(dataPath);
var port = new SerialPort('/dev/cu.usbmodem1411', {baudRate: 9600, autoOpen: false});
var Readline = SerialPort.parsers.Readline;
var parser = new Readline();
port.pipe(parser);
let MainScreen;

var dataArray;
var humedad;
var temperatura;
var radiacion;
var nivelEstanque;

function OpenMainScreen(){
  MainScreen = new BrowserWindow({width: 800, height: 600, minWidth:800, minHeight:600, center:true, show:false, resizable:true});
  MainScreen.once('ready-to-show', () => {
    MainScreen.show();
    port.open();
  });
  MainScreen.loadURL(url.format({
    pathname: path.join(__dirname, './Pages/Welcome/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  MainScreen.on('closed', () => {
    MainScreen = null;
  });
}


port.on('open', function() {
  MainScreen.webContents.send('board-data', {type: "ok", message: "Conectado al sistema"});
  readData();
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
  MainScreen.webContents.send('board-data', {type: "danger", message: "Error al conectar al sistema"});
});

app.on('ready', OpenMainScreen);



function readData(){
  parser.on('data', function(data){
    MainScreen.webContents.send('board-data', {type: "ok", message: "Leyendo datos"});
    dataArray = data.split(",");
    humedad = dataArray[0];
    temperatura = dataArray[1];
    radiacion = dataArray[2];
    nivelEstanque = dataArray[3];
    MainScreen.webContents.send('sensor-data', {humedad: humedad, temperatura: temperatura, radiacion: radiacion, nivelEstanque: nivelEstanque});
    if (radiacion < 800){
      port.write('L0');
    }
    else {
      port.write('L1');
    }
  });
  MainScreen.webContents.send('board-data', {type: "ok", message: "Conectado"});
}

storage.set('plantData', {minHum: '200', maxHum: '500', minTemp: '10', maxTemp: '35', waterTime: '3'}, function(error) {
  if (error) throw error;
});
