import { gameData } from "./questions.js";
import { mymap, marker } from './map.js';
import { startCounter, stopCounter, shuffle } from './functions.js';
import { drawChartCircular, drawChartLinear } from './chart.js';

export var paisesCircular = [];
export var tiemposLinea = [];

const botonPartida = document.getElementsByClassName('boton-partida')[0];
const paises = gameData.countries;
var paisesPorPartida;
const ciudadesPorPais = 3;

var contador;
var aciertos = 0;
var ronda = 0;
// Necesito rellenar el array con los nombres porque no lo consigo de otra manera
for (let i = 0; i < paises.length; i++) {
    paisesCircular.push([paises[i].name, 0])
}

/**
 * Es la función que se lanza al hacer clic en "Nueva Partida", llama a otras funciones e inicia el contador
 */
function nuevaRonda() {
    cleanPartida();
    paisesPorPartida = document.getElementById('dificultad').value;
    contador = setInterval(startCounter, 1000);
    var paisesPartida = paisesParaPartida(paises);
    var ciudadesPartida = ciudadesParaPartida(paisesPartida);
    printPartida(paisesPartida, ciudadesPartida);
    ronda++;
}
/**
 * Genera el entorno de la partida
 * @param {*} paisesPartida 
 * @param {*} ciudadesPartida 
 */
function printPartida(paisesPartida, ciudadesPartida) {
    ciudadesPartida.forEach(ciudad => {
        crearCiudad(ciudad);
    });
    paisesPartida.forEach(pais => {
        crearPais(pais);
    })
}
/**
 * Limpia completamente el entorno de juego y resetea el mapa y contador al inicio.
 */
function cleanPartida() {
    var contenedorDraggable = document.getElementsByClassName('draggable-zone')[0];
    var contenedorDroppable = document.getElementsByClassName('droppable-zone')[0];
    while (contenedorDraggable.firstChild) {
        contenedorDraggable.removeChild(contenedorDraggable.lastChild);
    }
    while (contenedorDroppable.firstChild) {
        contenedorDroppable.removeChild(contenedorDroppable.lastChild);
    }
    aciertos = 0;
    mymap.flyTo([28.45596, -16.28273], 18);
    marker.setLatLng([28.45596, -16.28273]);
    marker.bindPopup('CIFP César Manrique').openPopup();

    var contenedorSegundos = document.getElementsByClassName('segundos')[0];
    contenedorSegundos.textContent = "0";
}

//====================================================================================================================================//
//====================================================================================================================================//
//====================================================================================================================================//

/**
 * Crea una ciudad con los datos recibidos por parametro y la hace draggable
 * @param {*} ciudad 
 */
function crearCiudad(ciudad) {
    var ciudadContainer = document.getElementsByClassName('draggable-zone')[0];
    let ciudadTemplate = document.getElementById('ciudad-template');
    let ciudadNode = ciudadTemplate.content.firstElementChild.cloneNode(true);
    ciudadNode.firstElementChild.textContent = ciudad.nombre;
    ciudadNode.dataset.code = ciudad.code;
    ciudadContainer.appendChild(ciudadNode);
    $(ciudadNode).draggable({
        zIndex: 10000,
        revert: true
    })
}
/**
 * Crea un país y lo rellena con elementos del objeto que entra por parametro
 * @param {*} pais 
 */
function crearPais(pais) {
    var paisContainer = document.getElementsByClassName('droppable-zone')[0];
    let paisTemplate = document.getElementById('pais-template');
    let paisNode = paisTemplate.content.firstElementChild.cloneNode(true);
    paisNode.firstElementChild.textContent = pais.name;
    paisNode.lastElementChild.dataset.code = pais.code;
    paisContainer.appendChild(paisNode);
    manageDroppable(paisNode.lastElementChild)
}

// Lo busqué en base a esta información
//https://www.sitepoint.com/accessible-drag-drop/ 
//https://api.jqueryui.com/droppable/
/**
 * Hace comprobaciones cuando un elemento que se hace droppable cae sobre un elemento.
 * @param {*} event 
 */
function manageDroppable(element) {
    $(element).droppable({
        drop: function(a) {
            if (a.target.dataset.code === a.toElement.parentNode.dataset.code) {
                // Editar el draggable y añadirle al droppable la clase success
                $(a.toElement.parentNode).draggable({ revert: false });
                $(a.toElement.parentNode).draggable('destroy');
                a.target.classList.add('success');
                aciertos++;

                //Para sacar las coordenadas y el nombre de la ciudad para el Tooltip
                var nombreCiudad = a.toElement.parentNode.firstElementChild.textContent;
                var arrayPais = paises.find(e => e.code == a.target.dataset.code);
                var arrayCiudad = arrayPais.cities.find(e => e.name == nombreCiudad);

                //Cosas del mapa el ,18 es el zoom del mapa
                mymap.flyTo([arrayCiudad.location[0], arrayCiudad.location[1]], 18);
                marker.setLatLng([arrayCiudad.location[0], arrayCiudad.location[1]]);
                marker.bindPopup(nombreCiudad).openPopup();

                //Añadir al gráfico circular el país acertado
                for (let i = 0; i < paisesCircular.length; i++) {
                    if (paisesCircular[i][0] == arrayPais.name) {
                        paisesCircular[i][1]++; // https://stackoverflow.com/questions/32597043/how-to-increment-integer-array-values
                        drawChartCircular();
                    }
                }
                if (aciertos == paisesPorPartida) {
                    stopCounter(contador);
                    botonPartida.disabled = false;
                    var segundos = document.getElementsByClassName('segundos')[0].textContent;
                    tiemposLinea.push([ronda, Number(segundos)]);
                    drawChartLinear();
                }
            }
        }
    })
}

//====================================================================================================================================//
//====================================================================================================================================//
//====================================================================================================================================//

/**
 * Elige los paises para esta ronda del juego
 * @param {*} paises Objeto con todos los paises
 */
function paisesParaPartida(paises) {
    let paisesPartida = [];
    while (paisesPartida.length < paisesPorPartida) {
        var seleccion = Math.floor(Math.random() * (paises.length));
        if (!paisesPartida.includes(paises[seleccion])) {
            paisesPartida.push(paises[seleccion])
        }
    }
    return shuffle(paisesPartida);
}

/**
 * Elige las ciudades a partir de los paises seleccionados anteriormente
 * @param {*} paisesSeleccion Paises elegidos en la función paisesParaPartida();
 */
function ciudadesParaPartida(paisesSeleccion) {
    let ciudadesPartida = [];
    for (let i = 0; i < paisesSeleccion.length; i++) {
        var seleccion = Math.floor(Math.random() * (ciudadesPorPais));
        ciudadesPartida.push({ 'nombre': paisesSeleccion[i].cities[seleccion].name, 'code': paisesSeleccion[i].code });
    }
    return shuffle(ciudadesPartida);
}

botonPartida.addEventListener('click', function() {
    botonPartida.disabled = true;
    nuevaRonda();
});