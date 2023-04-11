var intentos = 6;
var arregloCoincidencias = [];
const palabaraAdivinar  = ingresaPalabra();

crearTabla(palabaraAdivinar);

    const letra = document.querySelector('input');
    letra.oninput = function(){
        if(Letras(letras.value)){
            Tabla(letra.value);
            Coincidencias(letra.value);
        }
    };

function ingresaPalabra(){
    let palabra = "";

    //se le pide al usuario que ingrese una palabra valida
    while(!/^[A-Za-z]+$/.test(palabra)){
        palabra = prompt("Ingrese su palabra:");

        //verifica que la palabra no contenga numeros, espacios o sea mas de una palabra
        if(!/^[A-Za-z]+$/.test(palabra)){
            alert("Esto no puede ser ingresado ya que:\n - Contiene numeros \ - Es mas de una palabra \n - Contiene un espaciado");
        }
    }
    
    //convierto la palabra ingresada en un arreglo de caracteres
    const arregloPalabra = palabra.split("");

    //se muestra el arreglo por la consola
    console.log(arregloPalabra);

    //se devuelve el arreglo de caracteres
    return arregloPalabra;
}

function crearTabla(){
    let tablero = document.getElementById("tabla");
    document.getElementById("tabla").classList.add("tabla");
    let tablahtml = "<table><tr>";

    arregloPalabra.forEach(letra => {
        arregloCoincidencias.push("?");
    })
    console.log(arregloCoincidencias);

    for(let i = 0; i < arregloCoincidencias.length; i++){
        tablahtml += "<td>" + arregloCoincidencias[i] + "<td>";
    }

    tablahtml += "</tr></table>";
    tablero.innerHTML = tablahtml;

    document.getElementById("intentos").innerHTML = 'Intentos antes de morir: ' + intentos;
    document.getElementById("intentos").classList.add("clase1");

}

function Letras(cadena){
    //esto permite que solo sean letras
    const pattern = new RegExp('[A-Za-z]'); 
    console.log(pattern.test(cadena));

    if(!pattern.test(cadena)){
        document.querySelector('input').value = "";
        document.getElementById('estado').innerHTML = "¡Solo se pueden colocar letra!";
        return false;
    }else{
        return true;
    }
}

function Coincidencias(letra){
    if(intentos <= 0){
        //detiene la funcion ya que no hay intentos disponibles
        return; 
    }

    let tablero = "";
    let aciertos = 0;

    palabaraAdivinar.forEach(caracter =>{
        if(caracter == letra){
            console.log(caracter);
            aciertos += 1;
        }
    });

    if(aciertos > 0){
        document.getElementById("estado").innerHTML = `Encontramos ${aciertos} coincidencias`;
        document.getElementById("estado").classList.add("clase1");

        if(arregloCoincidencias.indexOf("?") == -1){
            document.getElementById("resultado").innerHTML = '<p>¡Genial no moriste!</p>';
            document.getElementById("resultado").classList.add("clase1");
            letra.disable = true;
        }
    }else{
        intentos --;
        document.getElementById("estado").innerHTML = `No hubo coinciencias :(`;
        document.getElementById("estado").classList.add("clase1");
        document.getElementById("intentos").innerHTML = '<p>Intentos Restantes</p>'+intentos;
        document.getElementById("intentos").classList.add("clase1");

        if(intentos == 0){
            document.getElementById("resultado").innerHTML = '<p>¡Que lastima te moriste!</p>';
            document.getElementById("resultado").classList.add("clase1");
            letra.disable = true;
        }
    }

    let imagen = document.getElementById("imagen");

    switch(intentos){
        case 0:
            imagen.src = "";
        break;

        case 1:
            imagen.src = "";
        break;

        case 2:
            imagen.src = "";
        break;

        case 3:
            imagen.src = "";
        break;

        case 4:
            imagen.src = "";
        break;

        case 5:
            imagen.src = "";
        break;
    }
}

function Tabla(letra){
    let tablero = document.getElementById("tabla");
    let tablahtml = "<table><tr>";

    for(let i = 0; i < arregloCoincidencias.length; i++){
        if(palabaraAdivinar[i] == letra){
            arregloCoincidencias[i] = letra;
        }
    }

    for(i = 0; i < arregloCoincidencias.length; i++){
        tablahtml += "<td>" + arregloCoincidencias[i] + "</td>";
    }

    tablahtml += "</tr></table>";
    tablero.innerHTML = tablahtml;
}

function recargarPagina(){
    location.reload();
}