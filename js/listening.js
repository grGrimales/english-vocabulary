/* Inicia funcionalidad de sección listening + Writing */
import { sectionEjercicios } from "../js/ejercicios.js";
import { fetchConToken } from "../js/fetch.js";

/* Referencia al Html*/

const btnListening = document.querySelector(".btn-listening");
const audioListening = document.querySelector("#audio-listening");
const answer = document.querySelector("#answer");
export const sectionListening = document.querySelector(".section-listening");
const contenedorMessage = document.querySelector(".contenedor-msj");
const btnReturn = document.querySelector(".btn-return");
const modalListening = document.getElementById("modalListening");
const spanListening = document.getElementsByClassName("listening")[0];

/* Declaración variables */
export let activeQuestion = "";
let indexActiveQuestion;
let questionList = [];

let answerInput = "";

/**
 * Función para aumentar los aciertos
 */
const increaseNumberSuccessful = async (id, evaluation) => {
  await fetchConToken(
    `vocabulary/evaluateExercise/${id}?evaluation=${evaluation}`,
    {},
    "PUT"
  );
};

/**
 * Función para comprobar respuesta
 */
const evaluateAnswer = (e) => {
  activeQuestion = JSON.parse(localStorage.getItem("activeQuestion"));
  e.preventDefault();
  answerInput = answer.value;

  if (answerInput === "") {
    showErrrorInput("Debes ingresar un valor");
    printAudioActive(activeQuestion);
    return;
  }

  const isCorrect =
    answerInput && answerInput.toLowerCase() === activeQuestion.englishWord;

  isCorrect
    ? showMessage("Respuesta Exitosa", "success")
    : showMessage(`Respuesta correcta: ${activeQuestion.englishWord}`, "err");
};

/*
 * Función que muestra mensaje de error si es la palabra errada o de exito si es la acertada
 */
const showMessage = (messagge, tipo) => {
  const activeQuestionStorage = JSON.parse(
    localStorage.getItem("activeQuestion")
  );
  const { id } = activeQuestionStorage;

  switch (tipo) {
    case "success":
      increaseNumberSuccessful(id, true);
      const messagesuccess = document.createElement("p");
      messagesuccess.innerHTML = ` <i class="fa-solid fa-check"></i> ${messagge}  `;
      contenedorMessage.classList.add("success");
      contenedorMessage.appendChild(messagesuccess);
      questionList = JSON.parse(localStorage.getItem("questionList"));

      answer.value = "";

      setTimeout(() => {
        messagesuccess.remove();
        contenedorMessage.classList.remove("success");
      }, 2000);
      nextActiveWord(questionList);
      break;

    case "err":
      increaseNumberSuccessful(id, false);
      const messageError = document.createElement("p");
      messageError.innerHTML = ` <i id="error" class="fa-solid fa-xmark"></i> ${messagge}`;
      contenedorMessage.classList.add("error");
      contenedorMessage.appendChild(messageError);
      questionList = JSON.parse(localStorage.getItem("questionList"));
      answer.value = "";
      setTimeout(() => {
        messageError.remove();
        contenedorMessage.classList.remove("error");
      }, 2000);
      nextActiveWord(questionList);

    default:
      break;
  }
};

/**
 * Función para mostrar mensaje de error cuando el campo esta vacío
 */
const showErrrorInput = (error) => {
  const messageError = document.createElement("p");
  messageError.textContent = error;
  contenedorMessage.classList.add("error");
  contenedorMessage.appendChild(messageError);
  printAudioActive(activeQuestion);
  setTimeout(() => {
    messageError.remove();
    contenedorMessage.classList.remove("error");
  }, 1000);
};

/*
 * Función para iniciar los valores de palabra activa y el index
 */
export const initValueParameters = (listquestion) => {
  indexActiveQuestion = 0;
  activeQuestion = listquestion[indexActiveQuestion];
  saveValueParameters(indexActiveQuestion, activeQuestion);
};

/*
 * Función para  Actualizar en el local storage los valores de palabra activa y el index
 */
const nextActiveWord = (listWord) => {
  indexActiveQuestion = parseInt(localStorage.getItem("indexActiveQuestion"));

  if (indexActiveQuestion >= listWord.length - 1) {
    setTimeout(() => {
      openModalListening();
    }, 2000);
    return;
  }
  if (indexActiveQuestion < listWord.length) {
    indexActiveQuestion += 1;

    activeQuestion = listWord[indexActiveQuestion];
    saveValueParameters(indexActiveQuestion, activeQuestion);
    printAudioActive(activeQuestion);
  }
};

/**
 * Función para  Actualizar en el local storage los valores de palabra activa y el index
 */
export const saveValueParameters = (indexToUpdate, wordsToUpdate) => {
  localStorage.setItem("indexActiveQuestion", indexToUpdate);
  localStorage.setItem("activeQuestion", JSON.stringify(wordsToUpdate));
};

/**
 * Función para imprimir el audio de la palabra activa
 */
export const printAudioActive = (activeQuestion) => {
  const { audio } = activeQuestion;
  audioListening.src = audio;
  answer.focus();
};

/*
 *Función para verificar si ya existe el listado preguntas de listening + writting
 */
const checkquestionListLocalStorage = () => {
  const questionListStorage = JSON.parse(localStorage.getItem("questionList"));
  const activeQuestionStorage = JSON.parse(
    localStorage.getItem("activeQuestion")
  );
  const sectionEjercicios = document.querySelector(".section-ejercicios");

  if (questionListStorage !== null) {
    sectionEjercicios.classList.add("ocultar");
    sectionListening.classList.remove("ocultar");
    printAudioActive(activeQuestionStorage);
  }
};

checkquestionListLocalStorage();

/**
 * Función para cerrar la actividad de listening
 */
const closeListening = () => {
  clearLocalStorage();
  sectionListening.classList.add("ocultar");
  sectionEjercicios.classList.remove("ocultar");
};

/**
 *Función para abrir la ventana modal una vez que finaliza el listado de preguntas
 */
const openModalListening = () => {
  modalListening.style.display = "block";
};

/**
 *Función para cerrar la ventana modal de listening
 */
const closeModalListening = () => {
  modalListening.style.display = "none";
  clearLocalStorage();
  sectionListening.classList.add("ocultar");
  sectionEjercicios.classList.remove("ocultar");
};

/*
 *Función para borrar el localStorage
 */
export const clearLocalStorage = () => {
  localStorage.removeItem("questionList");
  localStorage.removeItem("indexActiveQuestion");
  localStorage.removeItem("activeQuestion");
};

/*
 * Eventos
 */
btnListening.addEventListener("click", evaluateAnswer);
btnListening.addEventListener("onkeypress", evaluateAnswer);
btnReturn.addEventListener("click", closeListening);
spanListening.addEventListener("click", closeModalListening);
