function crearArchivo(indTit, formato, datos) {

// Creo el array que va a devolver la función
    var salida = [];

// Primero tengo que partir en líneas
    var archivo = datos.split('\n');

// Si el indicador de titulos está informado, reemplazo el formato por los titulos
    if(indTit == 'S') {
      formato = archivo[0].split(';')
      var i = 1; 
    } else {
      var i = 0;
    };

// Por cada línea trato los datos del objeto
    for ( i ; i < archivo.length; i++) {

      // Creo el objeto
        var objeto = {};
 
      // Separo el registro en campos
        var registro = archivo[i].split(';');

      // Por cada campo informado en el formato asigno el valor y las propiedades
        for (var j = 0; j < formato.length; j++) {

            Object.defineProperty(objeto, formato[j], {
            value: registro[j],
            writable: true,
            enumerable: true,
            configurable: true
            });
        };

      // Agrego el objeto con los datos al array de salida
        salida.push(objeto);
    };

    return salida ;
};

/* Se debe invocar a la funcion de la siguiente manera:
    var indTit = 'S' <- Si el primer registro contiene tíitulos (si este valor es 'S' se omite el formato)
    var formato = ['nombre', 'segundonombre', 'apellido']; <- Array con los nombres de campos
    var datos = ['diego;andres;alarcon']; <- String con el archivo separando registros con '\n' y campos con ';' 
    var archivo = crearArchivo(formato, datos); <- Devuelve un array con objetos con la estructura del formato 
*/