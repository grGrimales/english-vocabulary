import listWords from "./db.js";

/* Inicia funcionalidad de sección listning + Writing */

/* Referencia al Html*/

const btnListening = document.querySelector(".btn-listening");
const audioListening = document.querySelector("#audio-listening");
const answer = document.querySelector("#answer");
const sectionListening = document.querySelector(".section-listening");
const contenedorMessage = document.querySelector(".contenedor-msj");
const error = document.querySelector("#error");
const btnReturn = document.querySelector(".btn-return");

/* Declaración variables */
let activeQuestion = "";
let indexActiveQuestion;

let answerInput = "";

/**
 * Función para comprobar respuesta
 */
const evaluateAnswer = (e) => {
  e.preventDefault();
  answerInput = answer.value;

  const isCorrect =
    answerInput && answerInput.toLowerCase() === activeQuestion.englishWord;

  isCorrect
    ? isSuccessful("Respuesta Exitosa")
    : showErrror("Solución correcta:");
};

/**
 * Función que se ejecuta cuando el usuario acierta la palabra
 */
const isSuccessful = (messagge) => {
  const messagesuccess = document.createElement("p");
  messagesuccess.innerHTML = ` <i class="fa-solid fa-check"></i> ${messagge}  `;
  contenedorMessage.classList.add("success");
  contenedorMessage.appendChild(messagesuccess);
  nextActiveWord(listWords);
  answer.value = "";

  setTimeout(() => {
    messagesuccess.remove();
    contenedorMessage.classList.remove("success");
  }, 2000);
  console.log("es valido");
};

/**
 * Función para mostrar mensaje de error
 */
const showErrror = (error) => {
  const messageError = document.createElement("p");
  messageError.innerHTML = ` <i id="error" class="fa-solid fa-xmark"></i> ${error}  ${activeQuestion.englishWord} `;
  contenedorMessage.classList.add("error");
  contenedorMessage.appendChild(messageError);
  //contenedorMessage.textContent = `<i id="error" class="fa-solid fa-xmark"></i>`;
  nextActiveWord(listWords);
  answer.value = "";

  setTimeout(() => {
    messageError.remove();
    contenedorMessage.classList.remove("error");
  }, 2000);
};

/**
 * Función para iniciar los valores de palabra activa y el index
 */
const initValueParameters = () => {
  indexActiveQuestion = parseInt(localStorage.getItem("indexActiveQuestion"));
  activeQuestion = localStorage.getItem("activeQuestion");

  if (!indexActiveQuestion) indexActiveQuestion = 0;

  if (!activeQuestion) activeQuestion = listWords[indexActiveQuestion];
};

initValueParameters();

/**
 * Función para  Actualizar en el local storage los valores de palabra activa y el index
 */
console.log(activeQuestion);
const nextActiveWord = (listWord) => {
  if (indexActiveQuestion >= listWord.length - 1) {
    indexActiveQuestion = 0;
    activeQuestion = listWord[indexActiveQuestion];
    console.log(activeQuestion);
    saveValueParameters(indexActiveQuestion, activeQuestion);
    printAudioActive(activeQuestion);
    return;
  }
  if (indexActiveQuestion < listWord.length) {
    indexActiveQuestion += 1;
    activeQuestion = listWord[indexActiveQuestion];
    saveValueParameters(indexActiveQuestion, activeQuestion);
    printAudioActive(activeQuestion);
  }

  console.log(indexActiveQuestion);
  console.log(activeQuestion);
};

/**
 * Función para  Actualizar en el local storage los valores de palabra activa y el index
 */
const saveValueParameters = (indexToUpdate, wordsToUpdate) => {
  localStorage.setItem("indexActiveQuestion", indexToUpdate);
  localStorage.setItem("activeQuestion", JSON.stringify(wordsToUpdate));
};

/**
 * Función para imprimir el audio de la palabra activa
 */
const printAudioActive = (activeQuestion) => {
  const { audio } = activeQuestion;
  audioListening.src = audio;
};

printAudioActive(activeQuestion);

/**
 * Función para cerrar la actividad
 */
const closeListening = () => {
  console.log("funciona");
};

/**
 * /Eventos
 */
btnListening.addEventListener("click", evaluateAnswer);
btnListening.addEventListener("onkeypress", evaluateAnswer);
btnReturn.addEventListener("click", closeListening);
