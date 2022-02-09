//Ejecutar función en el evento click
document.getElementById("btn_open").addEventListener("click", open_close_menu);

//Declaramos variables
const side_menu = document.getElementById("menu_side");
const btn_open = document.getElementById("btn_open");
const body = document.getElementById("body");

//Evento para mostrar y ocultar menú
function open_close_menu() {
  body.classList.toggle("body_move");
  side_menu.classList.toggle("menu__side_move");
}

//Si el ancho de la página es menor a 760px, ocultará el menú al recargar la página

if (window.innerWidth < 760) {
  body.classList.add("body_move");
  side_menu.classList.add("menu__side_move");
}

//Haciendo el menú responsive(adaptable)

window.addEventListener("resize", function () {
  if (window.innerWidth > 760) {
    body.classList.remove("body_move");
    side_menu.classList.remove("menu__side_move");
  }

  if (window.innerWidth < 760) {
    body.classList.add("body_move");
    side_menu.classList.add("menu__side_move");
  }
});

//Declaración variables - Array

let listWords = [
  {
    englishWord: "summer",
    spanishWord: "verano",
    audio: "",
    image: "",
    numberReproductions: 5,
    hit: 3,
  },

  {
    englishWord: "winter",
    spanishWord: "invierno",
    audio: "",
    image: "",
    numberReproductions: 6,
    hit: 4,
  },
  {
    englishWord: "book",
    spanishWord: "libro",
    audio: "",
    image: "",
    numberReproductions: 15,
    hit: 15,
  },
  {
    englishWord: "paper",
    spanishWord: "papel",
    audio: "",
    image: "",
    numberReproductions: 8,
    hit: 8,
  },
  {
    englishWord: "walk",
    spanishWord: "caminar",
    audio: "",
    image: "",
    numberReproductions: 5,
    hit: 5,
  },
  {
    englishWord: "smile",
    spanishWord: "sonreir",
    audio: "",
    image: "",
    numberReproductions: 20,
    hit: 18,
  },
  {
    englishWord: "rain",
    spanishWord: "lluvia",
    audio: "",
    image: "",
    numberReproductions: 10,
    hit: 8,
  },
  {
    englishWord: "sister",
    spanishWord: "hermana",
    audio: "",
    image: "",
    numberReproductions: 8,
    hit: 2,
  },
  {
    englishWord: "friend",
    spanishWord: "amigo",
    audio: "",
    image: "",
    numberReproductions: 15,
    hit: 15,
  },
];

//Función para devolver el array ordenado de forma aleatoria.

const randomOrder = (inputArray) => {
  inputArray.sort(() => Math.random() - 0.5);
};

//Función para ordenar el array por las palabras menos escuchadas.
const orderByLeastPlayed = (inputArray) => {
  inputArray.sort((a, b) => {
    if (a.numberReproductions > b.numberReproductions) {
      return 1;
    }
    if (a.numberReproductions < b.numberReproductions) {
      return -1;
    }
    return 0;
  });
};

//Función para ordenar el array por las palabras con menos aciertos
const orderByhit = (inputArray) => {
  inputArray.sort((a, b) => {
    if (a.hit > b.hit) {
      return 1;
    }
    if (a.hit < b.hit) {
      return -1;
    }
    return 0;
  });
};

//Interacción con el usuario

const filtro =
  "Escoge el orden para iniciar el juego: Aleatorio / Menos escuchadas / Menos aciertos";

let respuesta = prompt(filtro);
do {
  if (respuesta.toLowerCase() === "aleatorio") {
    randomOrder(listWords);
    console.log(listWords);
    break;
  } else if (respuesta.toLowerCase() === "menos escuchadas") {
    orderByLeastPlayed(listWords);
    console.table(listWords);
    break;
  } else if (respuesta.toLowerCase() === "menos aciertos") {
    orderByhit(listWords);
    console.table(listWords);
    break;
  } else {
    alert("Valor inválido");
    respuesta = prompt(filtro);
  }
} while (
  respuesta === "" ||
  respuesta !== "aleatorio" ||
  respuesta !== "menos escuchadas" ||
  respuesta !== "menos aciertos"
);
