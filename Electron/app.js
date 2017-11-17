/* jshint esversion: 6 */

const {app, BrowserWindow, Menu, ipcMain, dialog} = require('electron');
const path = require('path');
const url = require('url');
const SerialPort = require('serialport');
var port = new SerialPort('/dev/cu.usbmodem1411', {baudRate: 9600, autoOpen: false});
var Readline = SerialPort.parsers.Readline;
var parser = new Readline();
port.pipe(parser);
let MainScreen;

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
    console.log(data);
    MainScreen.webContents.send('sensor-data', {data: data});
    if (data < 800){
      port.write('L0');
    }
    else {
      port.write('L1');
    }
  });
}
