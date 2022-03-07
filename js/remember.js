/* Inicia funcionalidad de sección remember - words */

/* Referencia al Html*/
const btnReturnRemember = document.querySelector("#btnReturnRemember");
const btnFormRemember = document.querySelector("#btnFormRemember");

const modalRemember = document.getElementById("modalRemember");
const spanRemember = document.getElementsByClassName("remember")[0];
const sectionRememberWords = document.querySelector(".section-remember-words");
const actividadDos = document.querySelector("#actividad-dos");
const categoriaRemember = document.querySelector("#categoriaRemember");
const cantidadRemember = document.querySelector("#cantidadRemember");
const formRemember = document.querySelector("#formRemember");
const contErrorDos = document.querySelector(".cont-err-dos");

/* Declaración variables */
let activeQuestionRemember = "";
let indexActiveQuestionRemember;
let questionListRemember = [];
let filteredQuestionList = [];

let categoriaInputRemember = "";
let cantidadInputRemember = "";

/*
 *Función para abrir la ventana modal
 */
const openModalRemember = () => {
  modalRemember.style.display = "block";
};

/*
 *Función para mostra error en el formulario de remember
 */
const showErrrorFormRemember = (error) => {
  const messageError = document.createElement("p");
  messageError.textContent = error;
  contErrorDos.appendChild(messageError);
  contErrorDos.classList.add("error");
  setTimeout(() => {
    messageError.remove();
    contErrorDos.classList.remove("error");
  }, 2000);
};

/*
 *Función para iniciar la actividad de listening
 */
const startActivityDos = (e) => {
  e.preventDefault();
  categoriaInputRemember = categoriaRemember.value;
  cantidadInputRemember = cantidadRemember.value;
  if (
    categoriaInputRemember === "--Seleccione--" &&
    cantidadInputRemember < 1
  ) {
    showErrrorFormRemember("* Todos los campos son obligatorios");
  } else if (categoriaInputRemember != "" && cantidadInputRemember < 1) {
    showErrrorFormRemember("* Debe seleccionar un número mayor a 1");
  } else {
    filterListQuestionRemember(listWords);
    filteredByNumberOfSelectedQuestionsRemember(
      filteredQuestionList,
      cantidadInputRemember
    );

    sectionEjercicios.classList.add("ocultar");
    sectionRememberWords.classList.remove("ocultar");
    formRemember.reset();
    closeModalRemember();
  }
};

/*Función para filtrar la lista de preguntas por categoria
 */

const filterListQuestionRemember = (listWords) => {
  filteredQuestionList = listWords.filter(
    (listWord) => listWord.category == categoriaInputRemember
  );
  randomOrderRemember(filteredQuestionList);
};

/*
Función para devolver el array ordenado de forma aleatoria.*
*/

const randomOrderRemember = (filterList) => {
  filteredQuestionList = filterList.sort(() => Math.random() - 0.5);
};

/**
 * Función para  guardar el listado de pregunta de acuerdo a lo seleccionado en el formulario
 */
const saveFilteredListRemember = (filteredQuestionList) => {
  localStorage.setItem(
    "filteredQuestionList",
    JSON.stringify(filteredQuestionList)
  );
};

/*
 *Función para cerrar la ventana modal de remember words
 */
const closeModalRemember = () => {
  modalRemember.style.display = "none";
};

/**
 * Función para crear array con la cantidad de palabras seleccionada por el usuario
 */

const filteredByNumberOfSelectedQuestionsRemember = (
  filteredQuestionList,
  cantidadInputRemember
) => {
  filteredQuestionList = filteredQuestionList.slice(0, cantidadInputRemember);
  saveFilteredListRemember(filteredQuestionList);
};

/*
 *Función para cerrar la actividad
 */
const closeRemember = (e) => {
  console.log("funciona");
  e.preventDefault();
  clearLocalStorage();
  sectionEjercicios.classList.remove("ocultar");
  sectionRememberWords.classList.add("ocultar");
};

/*
 * /Eventos
 */

btnReturnRemember.addEventListener("click", closeRemember);
spanRemember.addEventListener("click", closeModalRemember);
actividadDos.addEventListener("click", openModalRemember);
btnFormRemember.addEventListener("click", startActivityDos);
