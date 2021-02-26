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

const joffrey = new Rey("Joffrey", "Baratheon", 44, 5);
const jamie = new Luchador("Jamie", "Lannister", 35, "Espada", 6);
const daenerys = new Luchador("Daenerys", "Targaryen", 22, "Dragones", 10);
const tyrion = new Asesor("Tyrion", "Lannister", 30, daenerys);
const bronn = new Escudero("Bronn", null, 23, jamie, 5);

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
    consola.log(personaje.getSerie);
  }
}

for (const mensaje of listaMensajes) {
  console.log(mensaje)
}

matar(personajes);
resumen(personajes);
function matar(personajes) {
  for (const personaje of personajes) {
    if (personaje.nombre.toLowerCase() === "tyrion") {
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
