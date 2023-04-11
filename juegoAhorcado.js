var intentos = 6;
var arregloCoincidencias = [];
const palabaraAdivinar  = ingresaPalabra();

crearTabla(palabaraAdivinar);

    const letra = document.querySelector('input');
    letra.oninput = function(){
        if(Letras(letra.value)){
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
            alert("Esto no puede ser ingresado ya que:\n - Contiene numeros \n - Es mas de una palabra \n - Contiene un espaciado");
        }
    }
    
    //convierto la palabra ingresada en un arreglo de caracteres
    const arregloPalabra = palabra.split("");

    //se muestra el arreglo por la consola
    console.log(arregloPalabra);

    //se devuelve el arreglo de caracteres
    return arregloPalabra;
};

//
function crearTabla(arregloPalabra){
    let tablero = document.getElementById("tabla");
    document.getElementById("tabla").classList.add("tabla");
    let tablahtml = "<table><tr>";

    arregloPalabra.forEach(letra => {
        arregloCoincidencias.push("?");
    })
    console.log(arregloCoincidencias);

    for(let i = 0; i < arregloCoincidencias.length; i++){
        tablahtml += "<td>" + arregloCoincidencias[i] + "</td>";
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
    
    //compara la letra que ingreso que las del arreglo
    palabaraAdivinar.forEach(caracter =>{
        if(caracter == letra){
            console.log(caracter);
            aciertos += 1;
        }
    });

    if(aciertos > 0){
        document.getElementById("estado").innerHTML = `Encontramos ${aciertos} coincidencias`;
        document.getElementById("estado").classList.add("clase1");
    
        //es un if que determina que si se completo la palabra gano
        if(arregloCoincidencias.indexOf("?") == -1){
            document.getElementById("resultado").innerHTML = '<p>¡Genial no moriste!</p>';
            document.getElementById("resultado").classList.add("clase1");
            letra.disabled = true;
        }
    }else{//sino hubo coincidecias resta un intento y te mustra cuantos quedan
        intentos--;
        document.getElementById("estado").innerHTML = `No hubo coinciencias`;
        document.getElementById("estado").classList.add("clase1");
        document.getElementById("intentos").innerHTML = '<p>Intentos Restantes</p>'+intentos;
        document.getElementById("intentos").classList.add("clase1");

        //si los intentos llegaron a cero se perdio y sale el cartel de moriste
        if(intentos == 0){
            document.getElementById("resultado").innerHTML = '<p>¡Que lastima te moriste!</p>';
            document.getElementById("resultado").classList.add("clase1");
            letra.disabled = true;
        }
    }

    let imagen = document.getElementById("imagen");

    //van cambiando las imagenes dependiedno de los intentos que tenga
    switch(intentos){
        case 0:
            imagen.src = "6intento.png";
            break;

        case 1:
            imagen.src = "5intento.png";
            break;

        case 2:
            imagen.src = "4intento.png";
            break;

        case 3:
            imagen.src = "3intento.png";
            break;

        case 4:
            imagen.src = "2intento.png";
            break;

        case 5:
            imagen.src = "1intento.png";
            break;
    }
}

//crea la tabla donde se van a poner los signos ?
function Tabla(letra){
    let tablero = document.getElementById("tabla");
    let tablahtml = "<table><tr>";

    for(let i = 0; i < palabaraAdivinar.length; i++){
        if(palabaraAdivinar[i]==letra){
            arregloCoincidencias[i]=letra;
        }
    }

    for(i = 0; i < arregloCoincidencias.length; i++){
        tablahtml += "<td>" + arregloCoincidencias[i] + "</td>";
    }

    tablahtml += "</tr></table>";
    tablero.innerHTML = tablahtml;
}

//recarga la pagina
function recargarPagina(){
    location.reload();
}