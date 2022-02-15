//Inicia funcionalidad del menú
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

//Finaliza funcionalidad del menú

//Inicia funcionalidad de sección vocabulario

//Referencia al Html
const categoria = document.getElementById("categoria");
const order = document.getElementById("order");
const btnInicio = document.querySelector("#btnInicio");
const sectionForm = document.querySelector(".section-form");
const sectionActividad = document.querySelector(".section-actividad");
const contenedorActiveWord = document.querySelector(".contenedor-active-word");
const contenedorActivity = document.querySelector(".contenedor-actividad");
//const contenedorActivity = document.querySelector(".contenedor-actividad");
const words = document.querySelector("#words");

//Declaración variables - Array

let listWords = [
  {
    englishWord: "summer",
    spanishWord: "verano",
    audio: "",
    image: "https://static.educalingo.com/img/en/800/winter.jpg",
    numberReproductions: 5,
    hit: 3,
    category: ["clima"],
  },

  {
    englishWord: "winter",
    spanishWord: "invierno",
    audio: "",
    image: "https://static.educalingo.com/img/en/800/winter.jpg",
    numberReproductions: 6,
    hit: 4,
    category: ["clima"],
  },
  {
    englishWord: "book",
    spanishWord: "libro",
    audio: "",
    image: "https://static.dw.com/image/58965278_101.jpg",
    numberReproductions: 15,
    hit: 15,
    category: ["clima"],
  },
  {
    englishWord: "paper",
    spanishWord: "papel",
    audio: "",
    image: "https://www.collinsdictionary.com/images/full/paper_111691001.jpg",
    numberReproductions: 8,
    hit: 8,
    category: ["oficina"],
  },
  {
    englishWord: "walk",
    spanishWord: "caminar",
    audio: "",
    image:
      "https://www.collinsdictionary.com/images/full/walking_616425206_1000.jpg",
    numberReproductions: 5,
    hit: 5,
    category: ["saludo"],
  },
  {
    englishWord: "smile",
    spanishWord: "sonreir",
    audio: "",
    image:
      "https://clinicabarreiro.es/wp-content/uploads/2021/09/beneficios-de-sonreir-800x450-1.jpg",
    numberReproductions: 20,
    hit: 18,
    category: ["saludo"],
  },
  {
    englishWord: "rain",
    spanishWord: "lluvia",
    audio: "",
    image:
      "https://www.caracteristicas.co/wp-content/uploads/2018/10/lluvia-3-e1581819535291.jpg",
    numberReproductions: 10,
    hit: 8,
    category: ["clima"],
  },
  {
    englishWord: "sister",
    spanishWord: "hermana",
    audio: "",
    image:
      "https://images.news18.com/ibnlive/uploads/2021/08/1627782219_sisters-day-2021-1600x900.jpgs",
    numberReproductions: 8,
    hit: 2,
    category: ["familia"],
  },
  {
    englishWord: "friend",
    spanishWord: "amigo",
    audio: "",
    image: "",
    numberReproductions: 15,
    hit: 15,
    category: ["saludo"],
  },
];

let selectCategoria = "";
let selectOrder = "";
let filteredWordList = [];

//Función para captar valor de input
const valueSelectCategoria = () => {
  selectCategoria = categoria.value;
};

const valueSelectOrder = () => {
  selectOrder = order.value;
};

//Función para devolver el array ordenado de forma aleatoria.

const randomOrder = (inputArray) => {
  filteredWordList = inputArray.sort(() => Math.random() - 0.5);
};

//Función para ordenar el array por las palabras menos escuchadas.
const orderByLeastPlayed = (inputArray) => {
  filteredWordList = inputArray.sort((a, b) => {
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
  filteredWordList = inputArray.sort((a, b) => {
    if (a.hit > b.hit) {
      return 1;
    }
    if (a.hit < b.hit) {
      return -1;
    }
    return 0;
  });
};

//Función para mostrar  el contenido en el HTML

const printActiveWord = (listWords) => {
  for (const listWord of listWords) {
    contenedorActiveWord.innerHTML = `
    <div class="contenedor-audio">
    <audio controls>
      <source
        src="${listWord.audio}"
        type="audio/mp3"
      />
      Tu navegador no soporta audio HTML5.
    </audio>
  </div>
  <ul class="active-word">
    <li>
    ${listWord.englishWord}
      <span class="iconify" data-icon="ep:arrow-down-bold"></span>
    </li>
    <li>${listWord.spanishWord}</li>
  </ul>
  <div class="img-word">
    <img src="${listWord.image}" />
  </div>`;

    contenedorActivity.append(words);
  }

  const list = listWords.map((listado) => {
    return `   <li>
  ${listado.englishWord}
  </li>`;
  });
  words.innerHTML = list;
};

// const printList = (listWords) => {
//   for (const listWord of listWords) {
//     contenedorActivity.innerHTML = `
//     <ul id="words" class="listado-words">
//     <li> ${listWord.englishWord}</li>

//   </ul>`;

//     sectionActividad.appendChild(contenedorActiveWord);
//   }
// };

//Función al hacer submit
const startActivity = (e) => {
  e.preventDefault();
  valueSelectCategoria();
  valueSelectOrder();

  sectionForm.classList.add("ocultar");
  sectionActividad.classList.remove("ocultar");

  let listToShow = [];

  listWords.forEach((vocabulary) => {
    if (vocabulary.category.includes(selectCategoria)) {
      listToShow.push(vocabulary);
    }
  });

  // let listToShow = listWords.filter((l) => {
  //   console.log(l.category.includes(selectCategoria));
  //   l.category.includes(selectCategoria);
  // });

  console.log(listToShow);

  if (selectOrder === "aleatorio") {
    randomOrder(listToShow);
    printActiveWord(filteredWordList);

    console.log(filteredWordList);
    console.log(listToShow);
  } else if (selectOrder === "menos reproducidas") {
    orderByLeastPlayed(listToShow);
    printActiveWord(filteredWordList);

    console.table(listToShow);
    console.table(filteredWordList);
  } else if (selectOrder === "menos aciertos") {
    orderByhit(listToShow);
    printActiveWord(filteredWordList);

    console.table(listToShow);
    console.table(filteredWordList);
  }

  console.log("Soy la función del botón 1");
  console.log(selectOrder);
  console.log(selectCategoria);
};

//Eventos

btnInicio.addEventListener("click", startActivity);

//Referencia al html
const palabras = document.getElementById("palabras");

// Interacción con el usuario

// const filtro =
//   "Escoge el orden para iniciar el juego: Aleatorio / Menos escuchadas / Menos aciertos";

// let respuesta = prompt(filtro);
// do {
//   if (respuesta.toLowerCase() === "aleatorio") {
//     randomOrder(listWords);
//     printActiveWord(listWords);
//     console.log(listWords);
//     break;
//   } else if (respuesta.toLowerCase() === "menos escuchadas") {
//     orderByLeastPlayed(listWords);
//     printActiveWord(listWords);

//     console.table(listWords);
//     break;
//   } else if (respuesta.toLowerCase() === "menos aciertos") {
//     orderByhit(listWords);
//     printActiveWord(listWords);

//     console.table(listWords);
//     break;
//   } else {
//     alert("Valor inválido");
//     respuesta = prompt(filtro);
//   }
// } while (
//   respuesta === "" ||
//   respuesta !== "aleatorio" ||
//   respuesta !== "menos escuchadas" ||
//   respuesta !== "menos aciertos"
// );
