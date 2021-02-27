class Personaje {
  serie = "Juego de Tronos";
  nombre;
  familia;
  edad;
  estado;
  frase;
  constructor(nombre, familia, edad) {
    this.nombre = nombre;
    this.familia = familia;
    this.edad = edad;
    this.estado = "vivo";
  }
  comunicar() {
    return this.frase;
  }
  morir() {
    this.estado = "muerto";
  }
  set frase(frase) {
    this.frase = frase;
  }
  get getSerie() {
    return `El nombre de la serie es ${this.serie}`;
  }
}

class Rey extends Personaje {
  añosReinado;
  frase = "Vais a morir todos";
  constructor(nombre, familia, edad, añosReinado) {
    super(nombre, familia, edad);
    this.añosReinado = añosReinado;
  }
}
class Luchador extends Personaje {
  armaUsada;
  destreza;
  frase = "Primero pego y luego pregunto";
  constructor(nombre, familia, edad, armaUsada, destreza) {
    super(nombre, familia, edad);
    this.armaUsada = armaUsada;

    this.destreza = destreza > 10 ? 10 : destreza;
  }
}
class Asesor extends Personaje {
  asesora;
  frase = "No sé por qué, pero creo que voy a morir pronto";
  constructor(nombre, familia, edad, asesora) {
    super(nombre, familia, edad);
    this.asesora = asesora;
  }
}
class Escudero extends Personaje {
  sirve;
  pelotismo;
  frase = "Soy un loser";
  constructor(nombre, familia, edad, sirve, pelotismo) {
    super(nombre, familia, edad);
    if (sirve instanceof Luchador) {
      this.sirve = sirve;
    }
    this.pelotismo = pelotismo;
  }
}

const joffrey = new Rey("Joffrey", "Baratheon", 18, 5);
const jamie = new Luchador("Jamie", "Lannister", 35, "Espada", 6);
const daenerys = new Luchador("Daenerys", "Targaryen", 22, "Dragones", 10);
const tyrion = new Asesor("Tyrion", "Lannister", 30, daenerys);
const bronn = new Escudero("Bronn", "", 23, jamie, 5);

const personajes = [joffrey, jamie, daenerys, tyrion, bronn]

const listaMensajes = guardarMensajes(personajes);

function guardarMensajes(listaPersonajes) {
  const listaMensajes = [];
  for (const personaje of listaPersonajes) {
    if (personaje instanceof Luchador) {
      listaMensajes.push(personaje.comunicar());
    }
  }
  return listaMensajes;
}

mostrarMensajes(personajes);

function mostrarMensajes(listaMensajes) {
  for (const mensaje of listaMensajes) {
    console.log(mensaje.getSerie);
  }
}

for (const mensaje of listaMensajes) {
  console.log(mensaje)
}

matar(personajes);
resumen(personajes);
function matar(personajes) {
  for (const personaje of personajes) {
    if (personaje.nombre.toLowerCase() === "joffrey") {
      personaje.morir()
    } else if (personaje.nombre.toLowerCase() === "jamie") {
      personaje.morir()
    }
  }
}
function resumen(listaPersonajes) {
  const listaPersonajesFiltrada = [];
  listaPersonajesFiltrada.push({
    tipo: "Rey",
    personajes: listaPersonajes
      .filter(personaje => personaje instanceof Rey)
      .sort((a, b) => a.edad - b.edad)
  });
  listaPersonajesFiltrada.push({
    tipo: "Luchador",
    personajes: listaPersonajes
      .filter(personaje => personaje instanceof Luchador)
      .sort((a, b) => a.edad - b.edad)
  });
  listaPersonajesFiltrada.push({
    tipo: "Asesor",
    personajes: listaPersonajes
      .filter(personaje => personaje instanceof Asesor)
      .sort((a, b) => a.edad - b.edad)
  });
  listaPersonajesFiltrada.push({
    tipo: "Escudero",
    personajes: listaPersonajes
      .filter(personaje => personaje instanceof Escudero)
      .sort((a, b) => a.edad - b.edad)
  });
  console.log(listaPersonajesFiltrada);
}

// Parte del DOM

console.log(personajes);
mostrarPantalla(personajes);

function mostrarPantalla(personajes) {
  const persons = document.querySelector(".personajes");
  const dummy = document.querySelector(".personaje-dummy");
  for (const [i, personaje] of personajes.entries()) {
    setTimeout(() => {
      const nuevoPersonaje = dummy.cloneNode();
      nuevoPersonaje.classList.remove("personaje-dummy");
      const divPersonajeCard = document.createElement("div");
      const foto = document.createElement("img");
      const divCardBody = document.createElement("div");
      const titulo = document.createElement("h2");
      const divInfo = document.createElement("div");
      const ulEdadEstado = document.createElement("ul");
      const liEdad = document.createElement("li");
      const liEstado = document.createElement("li");
      const icono = document.createElement("i");
      const emoji = document.createElement("i");
      const divAcciones = document.createElement("div");
      const botonHablar = document.createElement("button");
      const botonMorir = document.createElement("button");
      emoji.classList.add("emoji");
      divPersonajeCard.classList.add("card");
      divPersonajeCard.classList.add("personaje-card");
      foto.src = `img/${personaje.nombre.toLowerCase()}.jpg`;
      foto.alt = `${personaje.nombre} ${personaje.familia}`;
      foto.classList.add("card-img-top");
      divCardBody.classList.add("card-body");
      titulo.classList.add("nombre");
      titulo.classList.add("card-title");
      titulo.classList.add("h4");
      titulo.textContent = `${personaje.nombre} ${personaje.familia}`;
      divInfo.classList.add("info");
      ulEdadEstado.classList.add("metadata");
      ulEdadEstado.classList.add("list-unstyled");
      liEdad.textContent = `Edad: ${personaje.edad} años`;
      liEstado.textContent = "Estado:\n"
      icono.classList.add("fas");
      if (personaje.estado === "muerto") {
        foto.setAttribute("estado", "muerto");
        icono.classList.add("fa-thumbs-down");
      } else {
        foto.setAttribute("estado", "vivo");
        icono.classList.add("fa-thumbs-up");
      }
      const divPersonajeOverlay = document.createElement("div");
      const ulCaracteristicas = document.createElement("ul");
      divPersonajeOverlay.classList.add("personaje-overlay");
      ulCaracteristicas.classList.add("metadata");
      ulCaracteristicas.classList.add("list-unstyled");
      divAcciones.classList.add("acciones");
      botonHablar.classList.add("btn");
      botonHablar.classList.add("accion");
      botonHablar.textContent = "habla";
      botonHablar.id = "hablar";
      botonMorir.classList.add("btn");
      botonMorir.classList.add("accion");
      botonMorir.textContent = "muere";
      botonMorir.id = "morir";

      nuevoPersonaje.appendChild(divPersonajeCard);
      divPersonajeCard.appendChild(foto);
      divPersonajeCard.appendChild(divCardBody);
      divCardBody.appendChild(titulo);
      divCardBody.appendChild(divInfo);
      divInfo.appendChild(ulEdadEstado);
      ulEdadEstado.appendChild(liEdad);
      ulEdadEstado.appendChild(liEstado);
      liEstado.appendChild(icono);
      divCardBody.appendChild(divPersonajeOverlay);
      divPersonajeOverlay.appendChild(ulCaracteristicas);
      divPersonajeOverlay.appendChild(divAcciones);
      divAcciones.appendChild(botonHablar);
      divAcciones.appendChild(botonMorir);

      if (personaje instanceof Rey) {
        emoji.textContent = "👑";
        const reinado = document.createElement("li");
        reinado.textContent = `Años de reinado: ${personaje.añosReinado}`;
        ulCaracteristicas.appendChild(reinado);
      } else if (personaje instanceof Luchador) {
        emoji.textContent = "🗡";
        const arma = document.createElement("li");
        const destreza = document.createElement("li");
        arma.textContent = `Arma: ${personaje.armaUsada}`;
        destreza.textContent = `Destreza: ${personaje.destreza}`
        ulCaracteristicas.appendChild(arma);
        ulCaracteristicas.appendChild(destreza);
      } else if (personaje instanceof Asesor) {
        emoji.textContent = "🎓";
        const asesoracion = document.createElement("li");
        asesoracion.textContent = `Asesora a: ${personaje.asesora.nombre}`;
        ulCaracteristicas.appendChild(asesoracion);
      } else {
        emoji.textContent = "🛡";
        const pelota = document.createElement("li");
        const servicion = document.createElement("li");
        pelota.textContent = `Peloteo: ${personaje.pelotismo}`;
        servicion.textContent = `Sirve a: ${personaje.sirve.nombre}`;
        ulCaracteristicas.appendChild(pelota);
        ulCaracteristicas.appendChild(servicion);
      }
      persons.append(nuevoPersonaje);
    }, 1000 * (i + 1));
  }
}
