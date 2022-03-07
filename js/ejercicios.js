/*
 *Referencias al html
 */
const modal = document.getElementById("myModal");
const actividadUno = document.querySelector("#actividad-uno");
const span = document.getElementsByClassName("close")[0];
const sectionEjercicios = document.querySelector(".section-ejercicios");
const btnForm = document.querySelector("#btnForm");
const categoria = document.querySelector("#categoria");
const order = document.querySelector("#order");
const cantidad = document.querySelector("#cantidad");
const contError = document.querySelector(".cont-err");
const formEjercicios = document.querySelector("#formEjercicios");

/*
 *Declaración de variables
 */
let listquestion = [];
let orderedListing = [];

let categoriaInput = "";
let orderInput = "";
let cantidadInput;

/*
 *Función para cerrar la ventana modal cuando hace click fuera del modal
 */

window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }

  if (e.target == modalListening) {
    modalListening.style.display = "none";
    clearLocalStorage();
    sectionListening.classList.add("ocultar");
    sectionEjercicios.classList.remove("ocultar");
  }

  if (e.target == modalRemember) {
    modalRemember.style.display = "none";
    clearLocalStorage();
    sectionRememberWords.classList.add("ocultar");
    sectionEjercicios.classList.remove("ocultar");
  }
};

/*
 *Función para abrir la ventana modal
 */
const openModal = () => {
  modal.style.display = "block";
};

/*
 *Función para cerrar la ventana modal
 */
const closeModal = () => {
  modal.style.display = "none";
};

/**
 * Función para  guardar el listado de pregunta de acuerdo a lo seleccionado en el formulario
 */
const saveFilteredList = (questionList) => {
  localStorage.setItem("questionList", JSON.stringify(questionList));
};

/*
 *Función para mostra error en el formulario
 */
const showErrrorForm = (error) => {
  const messageError = document.createElement("p");
  messageError.textContent = error;
  contError.appendChild(messageError);
  contError.classList.add("error");
  setTimeout(() => {
    messageError.remove();
    contError.classList.remove("error");
  }, 2000);
};

/*
 *Función para verificar si ya existe el listado preguntas de listening + writting
 */
const checkquestionListLocalStorage = () => {
  questionList = JSON.parse(localStorage.getItem("questionList"));
  if (questionList !== null) {
    sectionEjercicios.classList.add("ocultar");
    sectionListening.classList.remove("ocultar");
  }
};

checkquestionListLocalStorage();
/*
 *Función para iniciar la actividad de listening
 */
const startActiviy = (e) => {
  e.preventDefault();
  categoriaInput = categoria.value;
  orderInput = order.value;
  cantidadInput = cantidad.value;

  if (categoriaInput === "--Seleccione--" || orderInput === "--Seleccione--") {
    showErrrorForm("* Todos los campos son obligatorios");
  } else if (cantidadInput < 1) {
    showErrrorForm("* Debe seleccionar un número mayor a 1");
  } else {
    filterListQuestion(listWords);

    if (orderInput === "aleatorio") {
      randomOrder(listquestion);
      filteredByNumberOfSelectedQuestions(listquestion, cantidadInput);
    } else if (orderInput === "menos reproducidas") {
      orderByLeastPlayed(listquestion);
      filteredByNumberOfSelectedQuestions(listquestion, cantidadInput);
    } else if (orderInput === "menos aciertos") {
      orderByHit(listquestion);
      filteredByNumberOfSelectedQuestions(listquestion, cantidadInput);
    }

    closeModal();
    formEjercicios.reset();

    sectionEjercicios.classList.add("ocultar");
    sectionListening.classList.remove("ocultar");

    initValueParameters(listquestion);
    printAudioActive(activeQuestion);
  }
};

/*
 *Función para filtrar la lista de preguntas por categoria
 */

const filterListQuestion = (listWords) => {
  listquestion = listWords.filter(
    (listWord) => listWord.category == categoriaInput
  );
};

/*
Función para devolver el array ordenado de forma aleatoria.*
*/

const randomOrder = (filterList) => {
  orderedListing = filterList.sort(() => Math.random() - 0.5);
};

randomOrder(listWords);

/*
 *Función para ordenar el array por las palabras menos escuchadas.
 */
const orderByLeastPlayed = (filterList) => {
  orderedListing = filterList.sort((a, b) => {
    if (a.numberReproductions > b.numberReproductions) {
      return 1;
    }
    if (a.numberReproductions < b.numberReproductions) {
      return -1;
    }
    return 0;
  });
};

/**
 * Función para ordenar el array por las palabras con menos aciertos
 */
const orderByHit = (filterList) => {
  orderedListing = filterList.sort((a, b) => {
    if (a.hit > b.hit) {
      return 1;
    }
    if (a.hit < b.hit) {
      return -1;
    }
    return 0;
  });
};

/**
 * Función para crear array con la cantidad de palabras seleccionada por el usuario
 */

const filteredByNumberOfSelectedQuestions = (filterList, cantidadInput) => {
  orderedListing = filterList.slice(0, cantidadInput);
  saveFilteredList(orderedListing);
};

/*
 *Función para verificar si ya existe el listado preguntas de remember words
 */
const checkquestionListLocalStorageRemember = () => {
  filteredQuestionList = JSON.parse(
    localStorage.getItem("filteredQuestionList")
  );
  if (filteredQuestionList !== null) {
    sectionEjercicios.classList.add("ocultar");
    sectionRememberWords.classList.remove("ocultar");
  }
};

checkquestionListLocalStorageRemember();
/*
 *Eventos
 */
actividadUno.addEventListener("click", openModal);
span.addEventListener("click", closeModal);
btnForm.addEventListener("click", startActiviy);
