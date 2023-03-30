let numeroInicial = 1;
let numeroFinal = 99;

//BOTONES

function play() {
  llenarCarton("Cbingo1");
  llenarCarton("Cbingo2");

  let btnPlay = document.getElementById("btnPlay");

  btnPlay.disabled = true;

  btnPlay.className += " noHover";
}

function reiniciar() {
  limpiar("Cbingo1");
  limpiar("Cbingo2");
  limpiar("tablaFinal");

  document.getElementById("salio").innerHTML = "0";

  let btnPlay = document.getElementById("btnPlay");
  btnPlay.classList.remove("noHover");

  btnPlay.disabled = false;
}

function limpiar(idCarton) {
  let tabla = document.getElementById(idCarton).getElementsByTagName("tr");

  for (i = 0; i < tabla.length; i++) {
    let cuadricula = tabla[i].getElementsByTagName("th");

    for (x = 0; x < cuadricula.length; x++) {
      cuadricula[x].innerHTML = "";
    }
  }
}

//FUNCIONES DE LAS TABLAS

function llenarCarton(idCarton) {
  let numeros = [];

  while (numeros.length < 16) {
    let aleatorio =
      Math.floor(Math.random() * (numeroFinal - numeroInicial)) + numeroInicial;
    if (numeros.indexOf(aleatorio) == -1) {
      numeros.push(aleatorio);
    }
  }

  let tabla = document.getElementById(idCarton).getElementsByTagName("tr");

  for (i = 0; i < tabla.length; i++) {
    let cuadricula = tabla[i].getElementsByTagName("th");

    for (x = 0; x < cuadricula.length; x++) {
      if (!cuadricula[x].classList.contains("nothing")) {
        // CLASSLIST DEVUELVE TODAS LAS CLASES QUE TIENE EL ELEMENTO. CONTAIN VERIFICA SI CONTIENE LA CLASE QUE LE ENVIAS ("X").
        cuadricula[x].innerHTML = numeros[0]; // ASIGNO EL PRIMER N° DE LA LISTA
        cuadricula[x].appendChild(document.createElement("div"));
        numeros = numeros.splice(1); //ELIMINA EL PRIMER N° DE LA LISTA
      }
    }
  }
}

let numerosF = [];

function salio() {
  let repetidos = false; //bandera verifica si se repite el numero
  let aleatorio;

  do {
    aleatorio =
      Math.floor(Math.random() * (numeroFinal - numeroInicial)) + numeroInicial;
    if (numerosF.indexOf(aleatorio) == -1) {
      numerosF.push(aleatorio);
      repetidos = false;
    } else {
      repetidos = true;
    }
  } while (repetidos == true);

  document.getElementById("salio").innerHTML = aleatorio;

  llenarTablaFinal(aleatorio);

  //jugador CPU

  let tablaDos = document.getElementById("Cbingo2");

  for (i = 0; i < tablaDos.length; i++) {
    let recorrido = tablaDos[i].getElementsByTagName("th");
    let recorridoDos = tablaDos[i].getElementsByTagName("tr");

    for (x = 0; x < recorrido.length; x++) {
      let numCuadro = recorrido[x].innerText;

      if (numCuadro == aleatorio) {
        let imagMarca = document.createElement("img");
        imagMarca.src = "https://i.ibb.co/gjH5PjB/moneda.png";
        imagMarca.style.width = "20px";
        recorrido[x].appendChild(imagMarca).innerHTML;
      }
    }
  }
}

function llenarTablaFinal(bolaNum) {
  let unoXuno = false;

  let tablaF = document.getElementById("tablaFinal").getElementsByTagName("tr");

  for (i = 0; i < tablaF.length; i++) {
    let cuadricula = tablaF[i].getElementsByTagName("th");

    for (x = 0; x < cuadricula.length; x++) {
      if (cuadricula[x].innerHTML == "" && unoXuno == false) {
        cuadricula[x].innerHTML = bolaNum;
        unoXuno = true;
      }
    }
  }
}

//Marcando numeros que salen

function marcaX(th) {
  let numT = th.innerText;
  let numB = document.getElementById("salio").innerHTML;
  if (numB == numT) {
    let imagMarca = document.createElement("img");
    imagMarca.src = "https://i.ibb.co/gjH5PjB/moneda.png";
    imagMarca.style.width = "20px";
    th.appendChild(imagMarca);
  }
}
