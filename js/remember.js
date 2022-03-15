import { sectionRememberWords, sectionEjercicios } from "../js/ejercicios.js";
import { saveValueParameters } from "../js/listening.js";

/* Referencia al Html*/
const btnReturnRemember = document.querySelector("#btnReturnRemember");
const contErrorDos = document.querySelector(".cont-err-dos");
const btnRemember = document.querySelector(".btn-remember");

const activeWordRemember = document.querySelector(".active-word-remember");
const rememberInput = document.querySelector("#rememberInput");
const formQuestionRemember = document.querySelector("#formQuestionRemember");

/* Declaración variables */
let activeQuestionRemember = JSON.parse(localStorage.getItem("activeQuestion"));
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

  console.log(activeWord);

  activeWordRemember.appendChild(activeWord);
};

/**
 * Función para comprobar respuesta
 */
const evaluateAnswerRemember = (e) => {
  let filteredQuestionList = JSON.parse(
    localStorage.getItem("filteredQuestionList")
  );

  e.preventDefault();
  answerInputRemember = rememberInput.value;

  if (answerInputRemember === "") {
    console.log("Debes ingresar un valor");

    return;
  } else {
    console.log("pasa a la siguiente");
    nextActiveWordRemember(filteredQuestionList);
    formQuestionRemember.reset();
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
      contenedorMessage.classList.add("success");
      contenedorMessage.appendChild(messagesuccess);
      sectionRememberWords.appendChild(contenedorMessage);

      answerInputRemember.value = "";

      setTimeout(() => {
        messagesuccess.remove();
        contenedorMessage.classList.remove("success");
      }, 2000);
      nextActiveWordRemember(filteredQuestionList);
      break;

    case "err":
      //increaseNumberSuccessful(id, false);
      const contenedorMessageErr = document.createElement("div");
      const messageError = document.createElement("p");
      messageError.innerHTML = ` <i id="error" class="fa-solid fa-xmark"></i> ${messagge}`;
      contenedorMessageErr.classList.add("error");
      contenedorMessageErr.appendChild(messageError);
      sectionRememberWords.appendChild(contenedorMessageErr);

      answerInputRemember.value = "";
      setTimeout(() => {
        messageError.remove();
        contenedorMessage.classList.remove("error");
      }, 2000);
      nextActiveWordRemember(filteredQuestionList);

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
    console.log("llego al final del listado");
    return;
  }
  if (indexActiveQuestion < listWord.length) {
    indexActiveQuestion += 1;

    activeQuestionRemember = listWord[indexActiveQuestion];
    saveValueParameters(indexActiveQuestion, activeQuestionRemember);
    printActiveWordRemember(activeQuestionRemember);
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
 *Función para cerrar la actividad
 */
const closeRemember = (e) => {
  e.preventDefault();
  clearLocalStorageRemember();
  sectionEjercicios.classList.remove("ocultar");
  sectionRememberWords.classList.add("ocultar");
};

/*
 *Función para borrar el local storage
 */
const clearLocalStorageRemember = () => {
  localStorage.removeItem("filteredQuestionList");
};

/*
 * /Eventos
 */

btnReturnRemember?.addEventListener("click", closeRemember);
btnRemember.addEventListener("click", evaluateAnswerRemember);
