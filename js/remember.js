import { sectionRememberWords, sectionEjercicios } from "../js/ejercicios.js";
import { saveValueParameters } from "../js/listening.js";

/* Referencia al Html*/
const btnReturnRemember = document.querySelector("#btnReturnRemember");
const contErrorDos = document.querySelector(".cont-err-dos");
const btnRemember = document.querySelector(".btn-remember");

const activeWordRemember = document.querySelector(".active-word-remember");
const rememberInput = document.querySelector("#rememberInput");
const contenedorRememberWords = document.querySelector(
  ".contenedor-remember-words"
);

export const modalRememberFinalized = document.getElementById(
  "modalRememberFinalized"
);
const rememberFinalized = document.getElementsByClassName("finalized")[0];

/* Declaración variables */

let indexActiveQuestion;

let answerInputRemember = "";

/* Función para limpiar el html*/

const clearHtml = () => {
  while (activeWordRemember.children[0]) {
    activeWordRemember.children[0].remove();
  }
};

/*
 *Función para mostrar  la palabra activa
 */
export const printActiveWordRemember = (activeQuestionRemember) => {
  clearHtml();
  const { englishWord, img } = activeQuestionRemember;
  const activeWord = document.createElement("li");
  activeWord.textContent = englishWord;
  activeWord.classList.add("active");

  activeWordRemember.appendChild(activeWord);
};

/**
 * Función para comprobar respuesta
 */
const evaluateAnswerRemember = (e) => {
  let activeQuestionRemember = JSON.parse(
    localStorage.getItem("activeQuestion")
  );
  let filteredQuestionList = JSON.parse(
    localStorage.getItem("filteredQuestionList")
  );

  e.preventDefault();
  answerInputRemember = rememberInput.value;

  if (answerInputRemember === "") {
    console.log("Debes ingresar un valor");

    return;
  }
  const isCorrect =
    answerInputRemember &&
    answerInputRemember.toLowerCase() === activeQuestionRemember.spanishWord;

  isCorrect
    ? showMessageRemember("Respuesta Exitosa", "success")
    : showMessageRemember(
        `Respuesta correcta: ${activeQuestionRemember.spanishWord}`,
        "err"
      );
};

/*
 * Función que muestra mensaje de error si es la palabra errada o de exito si es la acertada
 */
const showMessageRemember = (messagge, tipo) => {
  let activeQuestionRemember = JSON.parse(
    localStorage.getItem("activeQuestion")
  );
  const { id } = activeQuestionRemember;
  let filteredQuestionList = JSON.parse(
    localStorage.getItem("filteredQuestionList")
  );
  switch (tipo) {
    case "success":
      // increaseNumberSuccessful(id, true);
      const contenedorMessage = document.createElement("div");
      const messagesuccess = document.createElement("p");
      messagesuccess.innerHTML = ` <i class="fa-solid fa-check"></i> ${messagge}  `;
      contenedorMessage.classList.add("success", "contenedor-msj");
      contenedorMessage.appendChild(messagesuccess);
      contenedorRememberWords.appendChild(contenedorMessage);

      rememberInput.value = "";

      setTimeout(() => {
        contenedorMessage.remove();
      }, 2000);
      nextActiveWordRemember(filteredQuestionList);
      break;

    case "err":
      //increaseNumberSuccessful(id, false);
      const contenedorMessageErr = document.createElement("div");
      const messageError = document.createElement("p");
      messageError.innerHTML = ` <i id="error" class="fa-solid fa-xmark"></i> ${messagge}`;
      contenedorMessageErr.classList.add("error", "contenedor-msj");
      contenedorMessageErr.appendChild(messageError);
      contenedorRememberWords.appendChild(contenedorMessageErr);

      rememberInput.value = "";
      setTimeout(() => {
        contenedorMessageErr.remove();
      }, 2000);
      nextActiveWordRemember(filteredQuestionList);
      break;

    default:
      break;
  }
};

/*
 * Función para  Actualizar en el local storage los valores de palabra activa y el index
 */

const nextActiveWordRemember = (listWord) => {
  indexActiveQuestion = parseInt(localStorage.getItem("indexActiveQuestion"));

  if (indexActiveQuestion >= listWord.length - 1) {
    setTimeout(() => {
      openModalRememberFinalized();
    }, 2000);
    return;
  }
  if (indexActiveQuestion < listWord.length) {
    indexActiveQuestion += 1;

    const activeQuestion = listWord[indexActiveQuestion];
    saveValueParameters(indexActiveQuestion, activeQuestion);
    printActiveWordRemember(activeQuestion);
  }
};

/*
 *Función para mostra error en el formulario de remember
 */
export const showErrrorFormRemember = (error) => {
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
 *Función para verificar si ya existe el listado preguntas de remember words
 */
const checkquestionListLocalStorageRemember = () => {
  let filteredQuestionList = JSON.parse(
    localStorage.getItem("filteredQuestionList")
  );
  let activeQuestionRemember = JSON.parse(
    localStorage.getItem("activeQuestion")
  );
  if (filteredQuestionList !== null) {
    sectionEjercicios.classList.add("ocultar");
    printActiveWordRemember(activeQuestionRemember);
    sectionRememberWords.classList.remove("ocultar");
  } else {
    return;
  }
};

checkquestionListLocalStorageRemember();

/*
 *Función para cerrar la actividad
 */
const closeRemember = (e) => {
  e.preventDefault();
  clearLocalStorageRemember();
  sectionEjercicios.classList.remove("ocultar");
  sectionRememberWords.classList.add("ocultar");
};

/*
 *Función para abrir la ventana modal una vez que finaliza el listado de preguntas
 */
const openModalRememberFinalized = () => {
  modalRememberFinalized.style.display = "block";
};

/*
 *Función para cerrar la ventana modal de listening
 */
const closeModalRememberFinalized = () => {
  modalRememberFinalized.style.display = "none";
  clearLocalStorageRemember();
  sectionEjercicios.classList.remove("ocultar");
  sectionRememberWords.classList.add("ocultar");
};

/*
 *Función para borrar el local storage
 */
const clearLocalStorageRemember = () => {
  localStorage.removeItem("filteredQuestionList");
  localStorage.removeItem("activeQuestion");
  localStorage.removeItem("indexActiveQuestion");
};

/*
 * /Eventos
 */

btnReturnRemember?.addEventListener("click", closeRemember);
btnRemember.addEventListener("click", evaluateAnswerRemember);
rememberFinalized.addEventListener("click", closeModalRememberFinalized);
