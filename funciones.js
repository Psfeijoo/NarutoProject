function definirColor() {
    if (lineaSalida %2 == 0) {
      return "#D1E0E7";
    } else {
      return "#EAF3F7";
    }
};

function definirLinea(linea, registro) {
  if (linea == 0) {
    return "ti";
  } else {  
    if (registro.paquete == 0) {
      return "pr";
    } else {
      return "pq";
    }
  }
};

function crearProducto() {
  for (var i = 0; i < productos.length; i++) {
    var x = margenLeft;
    var y = margenTop + altoCelda * lineaSalida;
    for (var j = 0; j < 4; j++) {
      // Creo el div de los productos
      var celda = new Celda("prod"+lineaSalida+j, altoCelda, anchoCelda, definirColor(), y, x);
      celda.agregar();
      // Cargo el text de los productos
      var texto = [];
      switch(j) {
        case 0:  texto.push('<small style="margin-right:4px">', productos[i].pdv, '</small>')      
        break;
        case 1:  texto.push('<small style="margin-right:4px">', productos[i].paquete, '</small>')  
        break;
        case 2:  texto.push('<small style="margin-right:4px">', productos[i].producto, '</small>') 
        break;
        default: texto.push('<small style="margin-right:4px">', productos[i].limite, '</small>')
        }
      document.getElementById(celda.nombre).innerHTML = texto.join('');
      grillaSalida.push(celda)
      x = x + anchoCelda + 1
    } // end-for
    lineaSalida = lineaSalida + 1;
  } //end-for
};//end-function

function crearPaquete() {
  var x = margenLeft;
  for (var i = 0; i < paquetes.length; i++) {
    var y = margenTop + altoCelda * lineaSalida ;
    // Creo el div del paquete
    var celda = new Celda("pq"+lineaSalida+i, altoCelda, anchoGrilla, definirColor(), y, x);
    celda.agregar();
    // Agrego la información del paquete
    var texto = [];
    texto.push('<small style="margin-right:4px"> Paquete: ', paquetes[i].paquete, '</small>')
    document.getElementById(celda.nombre).innerHTML = texto.join('');
    grillaSalida.push(celda)
    lineaSalida = lineaSalida + 1;
  } //end-for
};//end-function

function crearEncabezado() {
      var x = margenLeft;
      var y = margenTop + altoCelda * lineaSalida;
      for (var i = 0; i < 4; i++) {
        // Creo el div de los titulos
        var celda = new Celda("titulo"+i, altoCelda, anchoCelda, "#8C969B", y, x);
        celda.agregar();
        // Cargo el text de los titulos
        var texto = [];
        switch(i) {
          case 0:  texto.push('<small style="margin-right:4px">', encabezado.pdv, '</small>')      
          break;
          case 1:  texto.push('<small style="margin-right:4px">', encabezado.paquete, '</small>')  
          break;
          case 2:  texto.push('<small style="margin-right:4px">', encabezado.producto, '</small>') 
          break;
          default: texto.push('<small style="margin-right:4px">', encabezado.limite, '</small>')
          } // end-swith
        document.getElementById(celda.nombre).innerHTML = texto.join('');
        grillaSalida.push(celda)
        x = x + anchoCelda + 1
      } // end-for
      lineaSalida = lineaSalida + 1;
};

function generarPantalla() {
    var celda = new Celda("Tituos", altoCelda, anchoGrilla, "#8C969B", margenTop, margenLeft);
    celda.agregar();
    texto = [];
    texto.push('<small style="margin-right:4px"> Oferta </small>')      
    document.getElementById(celda.nombre).innerHTML = texto.join('');
    document.getElementById(celda.nombre).addEventListener("click", function() {
        console.log('indPantalla', indPantalla)
        if (indPantalla == 's') {
            console.log('borrar pantalla')
            console.log(grillaSalida[0].nombre)
            for (var i = 0; i < grillaSalida.length; i++) {
                grillaSalida[i].borrar(grillaSalida[i].nombre);
            }//end-for
            indPantalla = 'n'
        } else {
            console.log('cargar pantalla')
            lineaSalida = 1;
            crearPaquete()
            crearEncabezado()
            crearProducto()                  
            indPantalla = 's'
        }
    } //end-function
    ) //end addEventListener
}; //end-function

function integrarGrilla(archivoIn) {
  // Cargo dos arrays, uno de paquetes y otro de productos sueltos
  for (var i = 0; i < archivoIn.length; i++) {
    var tipoReg = definirLinea(i, archivoIn[i]) 
    switch (tipoReg) {
      case "ti": 
        encabezado = archivoIn[i]
        break;
      case "pq":         
        var paqueteTratado = archivoIn[i].paquete
        paquetes.push(archivoIn[i])
        for (i; archivoIn[i].paquete == paqueteTratado; i++) {}
        i = i-1;
        break;
      default: 
        productos.push(archivoIn[i])
        break;
    } //end-switch
  } //end-for
}; //end-function

function procesarArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  };
  var lector = new FileReader();
  lector.onload = function(e) {
    // Leo el archivo
    var contenido = e.target.result;
    var formato = ['pdv', 'paquete', 'producto', 'limite'];
    var datos = contenido;
    var archivoIn = crearArchivo('N', formato, datos);
    // Cargo los arrays de productos sueltos y paquetes
    integrarGrilla(archivoIn);
    // Generar títulos
    generarPantalla();
  }; //end-funcion
  lector.readAsText(archivo);
}; //end-function
