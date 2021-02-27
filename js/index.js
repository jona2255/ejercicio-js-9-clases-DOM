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
  const foto = document.querySelector(".foto");
  const nombre = document.querySelector(".nombre");
  const emoji = document.querySelector(".emoji");
  const edad = document.querySelector(".info > .metadata > li");
  const vivo = document.querySelector(".vivo");
  const muerto = document.querySelector(".muerto");

  const reinado = document.querySelector(".reinado");
  const arma = document.querySelector(".arma");
  const destreza = document.querySelector(".destreza");
  const pelota = document.querySelector(".pelota");
  const asesoracion = document.querySelector(".asesoracion");
  const servicion = document.querySelector(".servicion");


  for (const [i, personaje] of personajes.entries()) {


    setTimeout(() => {




      const nuevoPersonaje = dummy.cloneNode(true);
      const listPersons = document.createElement("li")
      dummy.classList.remove("personaje-dummy");
      foto.src = `img/${personaje.nombre.toLowerCase()}.jpg`;
      foto.alt = `${personaje.nombre} ${personaje.familia}`;
      nombre.textContent = `${personaje.nombre} ${personaje.familia}`;
      edad.textContent = `Edad: ${personaje.edad} años`;

      if (personaje.estado === "muerto") {
        vivo.style.display = 'none';
        muerto.style.display = 'block';
        foto.setAttribute("estado", "muerto")
      } else {
        vivo.style.display = 'block';
        muerto.style.display = 'none';
        foto.setAttribute("estado", "vivo")
      }

      reinado.style.display = 'none';
      arma.style.display = 'none';
      destreza.style.display = 'none';
      asesoracion.style.display = 'none';
      pelota.style.display = 'none';
      servicion.style.display = 'none';

      if (personaje instanceof Rey) {
        emoji.textContent = "👑";
        reinado.textContent = `Años de reinado: ${personaje.añosReinado}`;
        reinado.style.display = 'block';

      } else if (personaje instanceof Luchador) {
        emoji.textContent = "🗡";
        arma.textContent = `Arma: ${personaje.armaUsada}`;
        destreza.textContent = `Destreza: ${personaje.destreza}`
        arma.style.display = 'block';
        destreza.style.display = 'block';

      } else if (personaje instanceof Asesor) {
        emoji.textContent = "🎓";
        asesoracion.textContent = `Asesora a: ${personaje.asesora.nombre}`;
        asesoracion.style.display = 'block';

      } else {
        emoji.textContent = "🛡";
        pelota.textContent = `Peloteo: ${personaje.pelotismo}`;
        servicion.textContent = `Sirve a: ${personaje.sirve.nombre}`;
        pelota.style.display = 'block';
        servicion.style.display = 'block';

      }

      nuevoPersonaje.appendChild(listPersons);
      persons.append(nuevoPersonaje);

      console.log(i)

    }, 1000 * (i + 1));


  }
}
