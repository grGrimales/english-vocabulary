/**Inicia funcionalidad de sección vocabulario*/

import { fetchConToken } from "../js/fetch.js";

/*Referencias al Html*/
const categoria = document.getElementById("categoria");
const order = document.getElementById("order");
const btnInicio = document.querySelector("#btnInicio");
const sectionForm = document.querySelector(".section-form");
const sectionActividad = document.querySelector(".section-actividad");
const contenedorActiveWord = document.querySelector(".contenedor-active-word");
const contenedorActivity = document.querySelector(".contenedor-actividad");
const words = document.querySelector("#words");
const audioHtml = document.getElementById("audio");
const categorySelected = document.querySelector("#category-selected");
const btnReturn = document.querySelector(".btn-return");

/*Declaración variables */
let selectCategoria = "";
let selectOrder = "";
let filteredWordList = [];
let currentIndexStorage = 0;
let wordActive = {};
let listToShow = [];
let listWords = JSON.parse(localStorage.getItem("listWords"));

/*Función para captar valor de input*/
const valueSelectCategoria = () => {
  selectCategoria = categoria.value;
  localStorage.setItem("selectCategoria", selectCategoria);
};
const valueSelectOrder = () => {
  selectOrder = order.value;
};

/* Función para crear select*/
const printSelect = async () => {
  const resp = await fetchConToken("category", {});
  const body = await resp.json();
  const categorys = body.categorys;
  for (let i = 0; i < categorys.length; i++) {
    let option = document.createElement("option");
    option.value = categorys[i].toLowerCase();
    option.text = categorys[i];
    categoria.appendChild(option);
  }
};
printSelect();

/*
 *Función para devolver el array ordenado de forma aleatoria.
 */
const randomOrder = (inputArray) => {
  const ramdonList = inputArray.sort(() => Math.random() - 0.5);

  localStorage.setItem("filteredWordList", JSON.stringify(ramdonList));
  localStorage.setItem("currentIndex", currentIndexStorage);
};

/*
 *Función para ordenar el array por las palabras menos escuchadas.
 */
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

/*
 *Función para ordenar el array por las palabras con menos aciertos
 */
const orderByHit = (inputArray) => {
  filteredWordList = inputArray.sort((a, b) => {
    if (a.numberSuccessful > b.numberSuccessful) {
      return 1;
    }
    if (a.numberSuccessful < b.numberSuccessful) {
      return -1;
    }
    return 0;
  });
  localStorage.setItem("filteredWordList", JSON.stringify(filteredWordList));
  localStorage.setItem("currentIndex", currentIndexStorage);
};

/*
 *Función para mostrar  la palabra activa en el HTML
 */
const printActiveWord = (listWords) => {
  if (listWords) {
    printListWord(listWords);
    sectionForm.classList.add("ocultar");
    sectionActividad.classList.remove("ocultar");
    let wordActiveStorage = JSON.parse(localStorage.getItem("wordActive"));

    wordActiveStorage !== {}
      ? (wordActive = wordActiveStorage)
      : (wordActive = listWords[0]);

    const { englishWord, audio, spanishWord, img } = wordActive;
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
    <img src="${img}" />
  </div>`;

    contenedorActiveWord.append(activeWord);
  }
};

/*
 *Función para mostrar  el listado en el HTML
 */
const printListWord = (listWords) => {
  let wordActiveStorage = JSON.parse(localStorage.getItem("wordActive"));

  wordActiveStorage !== {}
    ? (wordActive = wordActiveStorage)
    : (wordActive = listWords[0]);

  const list = listWords.map((listado) => {
    const { id, englishWord } = listado;
    return ` <li id=${id} class="list listar">${englishWord} </li>`;
  });

  words.innerHTML = list.join(" ");
  contenedorActivity.append(words);

  listWords.forEach((element) => {
    if (wordActive.id === element.id) {
      document.getElementById(wordActive.id).classList.toggle("active");
    }
  });
};

/*
 *Función pra imprimir la categoría seleccionada
 */
const printCategory = () => {
  const selectCategoriaStorage = localStorage.getItem("selectCategoria");
  categorySelected.textContent = selectCategoriaStorage?.toUpperCase();
};

/*
 *Función para mostra error en el formulario de Vocabulary
 */
export const showErrrorFormVocabulary = (error) => {
  const contenedorErr = document.createElement("div");
  const messageError = document.createElement("p");
  messageError.textContent = error;
  contenedorErr.appendChild(messageError);
  contenedorErr.classList.add("error", "cont-err");
  sectionForm.appendChild(contenedorErr);
  setTimeout(() => {
    contenedorErr.remove();
  }, 2000);
};

/*
 *Función al hacer submit para inicair actividad de voculario
 */
const startActivity = (e) => {
  e.preventDefault();
  valueSelectCategoria();
  valueSelectOrder();

  if (
    selectOrder === "--Seleccione--" ||
    selectCategoria === "--Seleccione--"
  ) {
    showErrrorFormVocabulary("* Todos los campos son requeridos");
    return;
  }

  listToShow = [];
  filteredWordList = [];

  if (listWords) {
    listWords.forEach((vocabulary) => {
      if (vocabulary.category.includes(selectCategoria)) {
        listToShow.push(vocabulary);
      }
    });

    localStorage.setItem("listToShow", JSON.stringify(listToShow));
    listToShow = JSON.parse(localStorage.getItem("listToShow"));

    if (selectOrder === "aleatorio") {
      randomOrder(listToShow);
      filteredWordList = JSON.parse(localStorage.getItem("filteredWordList"));
      localStorage.setItem("wordActive", JSON.stringify(filteredWordList[0]));
      printActiveWord(filteredWordList);
    } else if (selectOrder === "numberReproductions") {
      orderByLeastPlayed(listToShow);
      filteredWordList = JSON.parse(localStorage.getItem("filteredWordList"));
      localStorage.setItem("wordActive", JSON.stringify(filteredWordList[0]));
      printActiveWord(filteredWordList);
    } else if (selectOrder === "numberSuccessful") {
      orderByHit(listToShow);
      filteredWordList = JSON.parse(localStorage.getItem("filteredWordList"));
      localStorage.setItem("wordActive", JSON.stringify(filteredWordList[0]));
      printActiveWord(filteredWordList);
    }
    printCategory();
  } else if (!listWords) {
    Swal.fire({
      icon: "error",
      title: "Debe Iniciar sesión",
      text: "Inicie sesión",
      color: "#1bb1e6",
      confirmButtonColor: "#f77f00",
    });
  }
};

printCategory();

/*
 *Función para verificar si hay informacion en el localStorage
 */
const checkInformationLocalStorage = () => {
  filteredWordList = JSON.parse(localStorage.getItem("filteredWordList"));
  if (filteredWordList !== null || filteredWordList !== []) {
    printActiveWord(filteredWordList);
  }
};

checkInformationLocalStorage();

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
  if (
    currentIndexStorage >= filteredWordList.length &&
    filteredWordList.length > 0
  ) {
    localStorage.setItem("currentIndex", 0);
    localStorage.setItem("wordActive", JSON.stringify(filteredWordList[0]));
    clearHtml();
    printActiveWord(filteredWordList);
    playAudio();
  }
  if (
    currentIndexStorage < filteredWordList.length &&
    filteredWordList.length > 0
  ) {
    clearHtml();
    printActiveWord(filteredWordList);
    playAudio();
  }
};

/**
 *Función que reproduce el audio
 */
const playAudio = () => {
  audio.load();
  setTimeout(() => {
    audio.play();
  }, 700);
};

/* Función para cambiar palabra activa*/
const changeActiveWord = () => {
  currentIndexStorage = parseInt(localStorage.getItem("currentIndex"));
  currentIndexStorage += 1;
  wordActive = filteredWordList[currentIndexStorage];
  if (wordActive) {
    localStorage.setItem("wordActive", JSON.stringify(wordActive));
  }
  localStorage.setItem("currentIndex", currentIndexStorage);
};

/*
 * Función para reiniciar valores de las variables
 */
const resetValores = () => {
  selectCategoria = "";
  selectOrder = "";
  listToShow = [];
  filteredWordList = [];
  wordActive = {};
  currentIndexStorage = 0;
  localStorage.setItem("currentIndex", currentIndexStorage);
  localStorage.setItem("wordActive", JSON.stringify(wordActive));
  categoria.value = "--Seleccione--";
  order.value = "--Seleccione--";
};

/*
 * Reinciar variables y retornar al formulario
 */
const returnForm = (e) => {
  e.preventDefault();
  stopAudio();
  localStorage.removeItem("listToShow");
  localStorage.removeItem("filteredWordList");
  localStorage.removeItem("selectCategoria");
  localStorage.removeItem("wordActive");
  contenedorActiveWord.children[1].remove();
  resetValores();
  sectionActividad.classList.add("ocultar");
  sectionForm.classList.remove("ocultar");
  setTimeout(() => {
    stopAudio();
  }, 500);
};

/**
 * Detiene y reinicia el audio
 */
const stopAudio = () => {
  audio.pause();
  audio.currentTime = 0;
};

/*
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
audioHtml.addEventListener("ended", handleAudio);
btnReturn.addEventListener("click", returnForm);
words.addEventListener("click", selectActiveWord);
