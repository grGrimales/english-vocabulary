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
    image:
      "data:image/jpeg;base64,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",
    numberReproductions: 5,
    hit: 3,
  },

  {
    englishWord: "winter",
    spanishWord: "invierno",
    audio: "",
    image: "https://static.educalingo.com/img/en/800/winter.jpg",
    numberReproductions: 6,
    hit: 4,
  },
  {
    englishWord: "book",
    spanishWord: "libro",
    audio: "",
    image: "https://static.dw.com/image/58965278_101.jpg",
    numberReproductions: 15,
    hit: 15,
  },
  {
    englishWord: "paper",
    spanishWord: "papel",
    audio: "",
    image: "https://www.collinsdictionary.com/images/full/paper_111691001.jpg",
    numberReproductions: 8,
    hit: 8,
  },
  {
    englishWord: "walk",
    spanishWord: "caminar",
    audio: "",
    image:
      "https://www.collinsdictionary.com/images/full/walking_616425206_1000.jpg",
    numberReproductions: 5,
    hit: 5,
  },
  {
    englishWord: "smile",
    spanishWord: "sonreir",
    audio: "",
    image:
      "https://clinicabarreiro.es/wp-content/uploads/2021/09/beneficios-de-sonreir-800x450-1.jpg",
    numberReproductions: 20,
    hit: 18,
  },
  {
    englishWord: "rain",
    spanishWord: "lluvia",
    audio: "",
    image:
      "https://www.caracteristicas.co/wp-content/uploads/2018/10/lluvia-3-e1581819535291.jpg",
    numberReproductions: 10,
    hit: 8,
  },
  {
    englishWord: "sister",
    spanishWord: "hermana",
    audio: "",
    image:
      "https://images.news18.com/ibnlive/uploads/2021/08/1627782219_sisters-day-2021-1600x900.jpgs",
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
//Refeencia al html
const palabras = document.getElementById("palabras");

//Función para mostrar en HTML

const printList = (listWords) => {
  for (const listWord of listWords) {
    let contenedor = document.createElement("li");
    contenedor.innerHTML = `
      <div>
        <img src="${listWord.image}"
          alt="">
      </div>
      <p class="nombre">${listWord.englishWord}</p>
      <p class="precio">${listWord.spanishWord}</p>`;
    palabras.appendChild(contenedor);
  }
};

//Interacción con el usuario

const filtro =
  "Escoge el orden para iniciar el juego: Aleatorio / Menos escuchadas / Menos aciertos";

let respuesta = prompt(filtro);
do {
  if (respuesta.toLowerCase() === "aleatorio") {
    randomOrder(listWords);
    printList(listWords);
    console.log(listWords);
    break;
  } else if (respuesta.toLowerCase() === "menos escuchadas") {
    orderByLeastPlayed(listWords);
    printList(listWords);

    console.table(listWords);
    break;
  } else if (respuesta.toLowerCase() === "menos aciertos") {
    orderByhit(listWords);
    printList(listWords);

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
