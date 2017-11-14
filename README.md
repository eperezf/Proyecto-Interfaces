# Proyecto Diseño de Interfaces

## Integrantes:

* Claudio Campos
* Markus Krisam
* Eduardo Pérez
* Cristóbal Piña

## Objetivo:

Crear un sistema de manejo de riego de plantaciones. Este es el proyecto final para el ramo de Diseño de Interfaces de la Universidad Adolfo Ibáñez.

## Instalación:

Dentro del repositorio, hay dos carpetas. Electron, para el software para uso en el PC y Arduino, con el código y librerías a usar en el dispositivo.

#### Arduino:

Abrir el .ino en Arduino y subir el programa a la placa.

#### Electron:

Dentro de la carpeta Electron, se deben instalar los módulos de Node y recompilarlos para la versión específica de Electron. Se deben correr los siguientes comandos en el terminal, en orden, dentro de la carpeta Electron:

`npm install electron`

`npm install electron-rebuild -g`

`npm install jquery`

`npm install serialport`

`electron-rebuild`

Luego, se podrá iniciar el programa corriendo el comando `electron .`

## Licencia:

Está prohibido el uso del código o parte de este sin autorización de el o los autores.
