var lienzo;
var contexto;
var posX = 155;
var posY = 75;
var texto;
var boton1;
var boton2;
var lista;
var arreglo;

function init() {
	arreglo = [];
	texto = document.getElementById('texto');
	boton1 = document.getElementById('agregar');
	boton2 = document.getElementById('eliminar');
	lista = document.getElementById('lista');
	lienzo = document.getElementById('canvas'); //Busca el elemento en el DOM del HTML
	contexto = lienzo.getContext('2d');
	dibujar();
	boton1.onclick = agregar;
	boton2.onclick = eliminar;
	window.addEventListener("keydown",moverCirculo,false);
}

function dibujar() {
	contexto.clearRect(0,0,lienzo.width,lienzo.height); //Refrescar el canvas
	contexto.beginPath(); //Aviso para empezar a dibujar
	contexto.arc(posX,posY,10,0,2*Math.PI);
	contexto.stroke(); //Terminar de dibujar
	contexto.fillStyle = "#F70A68";
	contexto.fill();
}

function moverCirculo(tecla) {
	let step = 3;

	switch(tecla.keyCode) {
		case 37:
			posX = posX - step;
			break;
		case 38:
			posY = posY - step;
			break;
		case 39:
			posX = posX + step;
			break;
		case 40:
			posY = posY + step;				
	}
	if(posX > (lienzo.width-10)) { posX = posX - 3}
	if(posX < 10) { posX = posX + 3} 
	if(posY > (lienzo.height-10)) { posY = posY - 3}
	if(posY < 10) { posY = posY + 3}  
	dibujar();
}

function dibujarLista() {
	borrarLista();
	arreglo.forEach(x => {
		let opcion = document.createElement("option");
		opcion.text = x;
		lista.add(opcion);
	});
}

function borrarLista() {
	let l = lista.options.length;
	for(let i=0;i < l;i=i+1) {
		lista.remove(0);
	}
}

function agregar() {
	if(texto.value.length != 0) {	
		let str = texto.value;
		arreglo.push(str);
	} else alert('Ingrese una cadena en la caja de texto')
	dibujarLista();
}

function eliminar() {
	if(lista.value != null) {
		let seleccionado = lista.value;
		arreglo = arreglo.filter(x => {
			return x != seleccionado;
		})
	} else alert('La lista no tiene elementos')
	dibujarLista();
}

init();