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
const words = document.querySelector("#words");
const wordEnglishActive = document.querySelector(".word-english");
const audio = document.getElementById("audio");
const probar = document.getElementById("probar");
const categorySelected = document.querySelector("#category-selected");
const btnReturn = document.querySelector(".btn-return");

//Declaración variables - Array

let listWords = [
  {
    id: 1,
    englishWord: "summer",
    spanishWord: "verano",
    audio:
      "https://res.cloudinary.com/dvmpfgqrs/video/upload/v1636305522/phrase/audio/hello_jbfxag.mp3",
    image: "https://static.educalingo.com/img/en/800/winter.jpg",
    numberReproductions: 5,
    hit: 3,
    category: ["clima"],
  },

  {
    id: 2,
    englishWord: "winter",
    spanishWord: "invierno",
    audio:
      "https://res.cloudinary.com/dvmpfgqrs/video/upload/v1636305522/phrase/audio/hello_jbfxag.mp3",
    image: "https://static.educalingo.com/img/en/800/winter.jpg",
    numberReproductions: 6,
    hit: 4,
    category: ["clima"],
  },
  {
    id: 3,
    englishWord: "book",
    spanishWord: "libro",
    audio:
      "https://res.cloudinary.com/dvmpfgqrs/video/upload/v1636305522/phrase/audio/hello_jbfxag.mp3",
    image: "https://static.dw.com/image/58965278_101.jpg",
    numberReproductions: 15,
    hit: 15,
    category: ["clima"],
  },
  {
    id: 4,
    englishWord: "paper",
    spanishWord: "papel",
    audio:
      "https://res.cloudinary.com/dvmpfgqrs/video/upload/v1636305522/phrase/audio/hello_jbfxag.mp3",
    image: "https://www.collinsdictionary.com/images/full/paper_111691001.jpg",
    numberReproductions: 8,
    hit: 8,
    category: ["oficina"],
  },
  {
    id: 5,
    englishWord: "walk",
    spanishWord: "caminar",
    audio:
      "https://res.cloudinary.com/dvmpfgqrs/video/upload/v1636305522/phrase/audio/hello_jbfxag.mp3",
    image:
      "https://www.collinsdictionary.com/images/full/walking_616425206_1000.jpg",
    numberReproductions: 5,
    hit: 5,
    category: ["saludo"],
  },
  {
    id: 6,
    englishWord: "smile",
    spanishWord: "sonreir",
    audio:
      "https://res.cloudinary.com/dvmpfgqrs/video/upload/v1636305522/phrase/audio/hello_jbfxag.mp3",
    image:
      "https://clinicabarreiro.es/wp-content/uploads/2021/09/beneficios-de-sonreir-800x450-1.jpg",
    numberReproductions: 20,
    hit: 18,
    category: ["saludo"],
  },
  {
    id: 7,
    englishWord: "rain",
    spanishWord: "lluvia",
    audio:
      "https://res.cloudinary.com/dvmpfgqrs/video/upload/v1636305522/phrase/audio/hello_jbfxag.mp3",
    image:
      "https://www.caracteristicas.co/wp-content/uploads/2018/10/lluvia-3-e1581819535291.jpg",
    numberReproductions: 10,
    hit: 8,
    category: ["clima"],
  },
  {
    id: 8,
    englishWord: "sister",
    spanishWord: "hermana",
    audio:
      "https://res.cloudinary.com/dvmpfgqrs/video/upload/v1636305522/phrase/audio/hello_jbfxag.mp3",
    image:
      "https://images.news18.com/ibnlive/uploads/2021/08/1627782219_sisters-day-2021-1600x900.jpgs",
    numberReproductions: 8,
    hit: 2,
    category: ["familia"],
  },
  {
    id: 9,
    englishWord: "friend",
    spanishWord: "amigo",
    audio:
      "https://res.cloudinary.com/dvmpfgqrs/video/upload/v1636305522/phrase/audio/hello_jbfxag.mp3",
    image:
      "https://mejorconsalud.as.com/wp-content/uploads/2016/11/amigas-abrazandose-sofa-768x512.jpg",

    numberReproductions: 15,
    hit: 15,
    category: ["saludo"],
  },
];

let selectCategoria = "";
let selectOrder = "";
let filteredWordList = [];
let wordActive = {};
let currentIndexStorage = 0;
let listToShow = [];

//Función para captar valor de input
const valueSelectCategoria = () => {
  selectCategoria = categoria.value;
  localStorage.setItem("selectCategoria", selectCategoria);
};

const valueSelectOrder = () => {
  selectOrder = order.value;
};

//Función para devolver el array ordenado de forma aleatoria.

const randomOrder = (inputArray) => {
  const ramdonList = inputArray.sort(() => Math.random() - 0.5);
  localStorage.setItem("filteredWordList", JSON.stringify(ramdonList));
  localStorage.setItem("currentIndex", currentIndexStorage);
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
  localStorage.setItem("filteredWordList", JSON.stringify(filteredWordList));
  localStorage.setItem("currentIndex", currentIndexStorage);
};

//Función para ordenar el array por las palabras con menos aciertos
const orderByHit = (inputArray) => {
  filteredWordList = inputArray.sort((a, b) => {
    if (a.hit > b.hit) {
      return 1;
    }
    if (a.hit < b.hit) {
      return -1;
    }
    return 0;
  });
  localStorage.setItem("filteredWordList", JSON.stringify(filteredWordList));
  localStorage.setItem("currentIndex", currentIndexStorage);
};

//Función para mostrar  el contenido en el HTML

const printActiveWord = (listWords) => {
  //wordActive = JSON.parse(localStorage.getItem("wordActive"));
  printListWord(listWords);
  sectionForm.classList.add("ocultar");
  sectionActividad.classList.remove("ocultar");
  let wordActiveStorage = JSON.parse(localStorage.getItem("wordActive"));
  if (wordActiveStorage !== null) {
    wordActive = wordActiveStorage;
  } else {
    wordActive = listWords[0];
  }

  audio.src = wordActive.audio;
  const activeWord = document.createElement("div");
  activeWord.setAttribute("id", "idActiveWord");

  activeWord.innerHTML = `

  <ul class="active-word">
    <li class="word-english">
    ${wordActive.englishWord}
    <i class="fa-solid fa-angle-right change"></i>
    </li>
    <li  class="word-spanish">${wordActive.spanishWord}</li>
  </ul>
  <div class="img-word">
    <img src="${wordActive.image}" />
  </div>`;

  contenedorActiveWord.append(activeWord);
};

//Función para mostrar  el contenido en el HTML
const printListWord = (listWords) => {
  // wordActive = JSON.parse(localStorage.getItem("wordActive"));

  let wordActiveStorage = JSON.parse(localStorage.getItem("wordActive"));
  if (wordActiveStorage !== null) {
    wordActive = wordActiveStorage;
  } else {
    wordActive = listWords[0];
  }

  const list = listWords.map((listado) => {
    return ` <li id=${listado.id} class="list ">
      ${listado.englishWord}
      </li>
    `;
  });

  words.innerHTML = list;
  contenedorActivity.append(words);

  listWords.forEach((element) => {
    if (wordActive.id === element.id) {
      document.getElementById(wordActive.id).classList.toggle("active");
    }
  });
};

//Función para verificar si hay informacion en el localStorage

const checkInformationLocalStorage = () => {
  filteredWordList = JSON.parse(localStorage.getItem("filteredWordList"));
  if (filteredWordList !== null) {
    printActiveWord(filteredWordList);
  }
};

checkInformationLocalStorage();

//Función pra imprimir la categoría seleccionada

const printCategory = () => {
  const selectCategoriaStorage = localStorage.getItem("selectCategoria");
  categorySelected.textContent = selectCategoriaStorage?.toUpperCase();
};

//Función al hacer submit para inicair actividad de voculario
const startActivity = (e) => {
  e.preventDefault();
  valueSelectCategoria();
  valueSelectOrder();

  if (
    selectOrder === "--Seleccione--" ||
    selectCategoria === "--Seleccione--"
  ) {
    return;
  }

  listToShow = [];
  filteredWordList = [];

  listWords.forEach((vocabulary) => {
    if (vocabulary.category.includes(selectCategoria)) {
      listToShow.push(vocabulary);
    }
  });

  localStorage.setItem("listToShow", JSON.stringify(listToShow));

  if (selectOrder === "aleatorio") {
    listToShow = JSON.parse(localStorage.getItem("listToShow"));
    randomOrder(listToShow);
    filteredWordList = JSON.parse(localStorage.getItem("filteredWordList"));
    localStorage.setItem("wordActive", JSON.stringify(filteredWordList[0]));
    printActiveWord(filteredWordList);
  } else if (selectOrder === "menos reproducidas") {
    listToShow = JSON.parse(localStorage.getItem("listToShow"));
    orderByLeastPlayed(listToShow);
    filteredWordList = JSON.parse(localStorage.getItem("filteredWordList"));
    localStorage.setItem("wordActive", JSON.stringify(filteredWordList[0]));
    printActiveWord(filteredWordList);
  } else if (selectOrder === "menos aciertos") {
    listToShow = JSON.parse(localStorage.getItem("listToShow"));
    orderByHit(listToShow);
    filteredWordList = JSON.parse(localStorage.getItem("filteredWordList"));
    localStorage.setItem("wordActive", JSON.stringify(filteredWordList[0]));

    printActiveWord(filteredWordList);
  }

  printCategory();
};
printCategory();
/* Función para ocultar o mostrar palabra en español*/
const hideWordSpanish = (e) => {
  e.preventDefault();
  if (
    (e.target.nodeName == "LI" && e.target.className == "word-english") ||
    e.target.nodeName == "I"
  ) {
    document.querySelector(".word-spanish").classList.toggle("ocultar");
    document.querySelector(".change").classList.toggle("fa-angle-right");
    document.querySelector(".change").classList.toggle("fa-angle-down");
  }
};

/* Función para manejar etiqueta de audio*/

const handleAudio = () => {
  changeActiveWord();
  const currentIndexStorage = parseInt(localStorage.getItem("currentIndex"));

  // LLega al final del listado
  if (currentIndexStorage >= filteredWordList.length) {
    localStorage.setItem("currentIndex", 0);
    localStorage.setItem("wordActive", JSON.stringify(filteredWordList[0]));
    contenedorActiveWord.children[1]?.remove();
    printActiveWord(filteredWordList);
    playAudio();
  }
  if (currentIndexStorage < filteredWordList.length) {
    contenedorActiveWord.children[1]?.remove();
    printActiveWord(filteredWordList);
    playAudio();
  }
};

// Reproduce el audio
const playAudio = () => {
  audio.load();
  setTimeout(() => {
    audio.play();
  }, 500);
};

/* Función para cambiar palabra activa*/

const changeActiveWord = () => {
  currentIndexStorage = parseInt(localStorage.getItem("currentIndex"));

  currentIndexStorage += 1;

  wordActive = filteredWordList[currentIndexStorage];

  //guardar en el local storage wordActive
  // validamos si wordActive existe, si existe lo guardamos en localstorage
  if (wordActive) {
    localStorage.setItem("wordActive", JSON.stringify(wordActive));
  }
  localStorage.setItem("currentIndex", currentIndexStorage);
};

// Función para reiniciar valores de las variables
const resetValores = () => {
  selectCategoria = "";
  selectOrder = "";
  filteredWordList = [];
  listToShow = [];

  // wordActive = {};
  currentIndexStorage = 0;
  localStorage.setItem("currentIndex", currentIndexStorage);

  //localStorage.setItem("wordActive", JSON.stringify(wordActive));

  categoria.value = "--Seleccione--";
  order.value = "--Seleccione--";
};

/**
 * Reinciar variables y retornar al formulario
 */
const returnForm = () => {
  stopAudio();

  localStorage.clear();
  resetValores();

  contenedorActiveWord.children[1].remove();
  sectionActividad.classList.add("ocultar");
  sectionForm.classList.remove("ocultar");
};

/**
 * Detiene y reinicia el audio
 */
const stopAudio = () => {
  audio.pause();
  audio.currentTime = 0;
};

/*Eventos*/

btnInicio.addEventListener("click", startActivity);
contenedorActiveWord.addEventListener("click", hideWordSpanish);
audio.addEventListener("ended", handleAudio);
btnReturn.addEventListener("click", returnForm);
