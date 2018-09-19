const altoCelda = 22;
const anchoCelda = 200;
const columnas = 4;
const anchoGrilla = anchoCelda * columnas + columnas -1;
const margenTop = 200;
const margenLeft = 8;

var lineaSalida = 1;
var grillaSalida = [];
var encabezado
var paquetes = [];
var productos = [];

document.getElementById('file-input')
  .addEventListener('change', leerArchivo, false);


