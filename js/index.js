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
const audioHtml = document.getElementById("audio");
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
  printListWord(listWords);
  sectionForm.classList.add("ocultar");
  sectionActividad.classList.remove("ocultar");
  let wordActiveStorage = JSON.parse(localStorage.getItem("wordActive"));

  wordActiveStorage !== {}
    ? (wordActive = wordActiveStorage)
    : (wordActive = listWords[0]);

  const { englishWord, audio, spanishWord, image } = wordActive;
  audioHtml.src = audio;
  const activeWord = document.createElement("div");
  activeWord.setAttribute("id", "idActiveWord");

  activeWord.innerHTML = `

  <ul class="active-word">
    <li class="word-english">
    ${englishWord}
    <i class="fa-solid fa-angle-right change"></i>
    </li>
    <li  class="word-spanish">${spanishWord}</li>
  </ul>
  <div class="img-word">
    <img src="${image}" />
  </div>`;

  contenedorActiveWord.append(activeWord);
};

//Función para mostrar  el contenido en el HTML
const printListWord = (listWords) => {
  let wordActiveStorage = JSON.parse(localStorage.getItem("wordActive"));

  wordActiveStorage !== {}
    ? (wordActive = wordActiveStorage)
    : (wordActive = listWords[0]);

  const list = listWords.map((listado) => {
    const { id, englishWord } = listado;

    return ` <li id=${id} class="list listar">
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
    Swal.fire({
      icon: "error",
      title: "Los campos son requeridos",
      text: "Selecciona ambos valores",
      color: "#1bb1e6",
      confirmButtonColor: "#f77f00",
    });
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

/* Función para limpiar el html*/

const clearHtml = () => {
  while (contenedorActiveWord.children[1]) {
    contenedorActiveWord.children[1].remove();
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
    clearHtml();
    printActiveWord(filteredWordList);
    playAudio();
  }
  if (currentIndexStorage < filteredWordList.length) {
    clearHtml();
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
  listToShow = [];
  wordActive = {};
  currentIndexStorage = 0;
  localStorage.setItem("currentIndex", currentIndexStorage);

  localStorage.setItem("wordActive", JSON.stringify(wordActive));

  categoria.value = "--Seleccione--";
  order.value = "--Seleccione--";
};

/**
 * Reinciar variables y retornar al formulario
 */
const returnForm = (e) => {
  e.preventDefault();
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

/**
 * función para cambiar la palabra activa cuando demos clik en la palabra que queremos
 */
const selectActiveWord = (e) => {
  if (e.target.classList.contains("list")) {
    const idSelectWord = e.target.id;
    const filteredClick = filteredWordList.filter(
      (words) => words.id == idSelectWord
    );
    const index = filteredWordList.findIndex(
      (indexWord) => indexWord.id == idSelectWord
    );

    wordActive = filteredClick[0];

    localStorage.setItem("wordActive", JSON.stringify(wordActive));
    localStorage.setItem("currentIndex", index);
    clearHtml();
    printActiveWord(filteredWordList);
    playAudio();
  }
};

/*Eventos*/

btnInicio.addEventListener("click", startActivity);
contenedorActiveWord.addEventListener("click", hideWordSpanish);
audio.addEventListener("ended", handleAudio);
btnReturn.addEventListener("click", returnForm);
words.addEventListener("click", selectActiveWord);
