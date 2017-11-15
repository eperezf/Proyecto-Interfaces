/* jshint esversion: 6 */

const {app, BrowserWindow, Menu, ipcMain, dialog} = require('electron');
const path = require('path');
const url = require('url');
const SerialPort = require('serialport');

let MainScreen;

function OpenMainScreen(){
  MainScreen = new BrowserWindow({width: 800, height: 600, minWidth:800, minHeight:600, center:true, show:true, resizable:true});

  MainScreen.loadURL(url.format({
    pathname: path.join(__dirname, './Pages/Welcome/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  MainScreen.on('closed', () => {
    MainScreen = null;
  });

}
function sayHello() {
  console.log('hello app');
}
app.on('ready', OpenMainScreen);
