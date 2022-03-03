/*
 *Referencias al html
 */
const modal = document.getElementById("myModal");
const actividadUno = document.querySelector("#actividad-uno");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const sectionEjercicios = document.querySelector(".section-ejercicios");
const btnForm = document.querySelector("#btnForm");
const categoria = document.querySelector("#categoria");
const order = document.querySelector("#order");
const cantidad = document.querySelector("#cantidad");

/*
 *Declaración de variables
 */
let listquestion = [];
let orderedListing = [];

let categoriaInput = "";
let orderInput = "";
let cantidadInput = "";

/*
 *Función para cerrar la ventana modal cuando hace click fuera del modal
 */

window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = "none";
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
 *Función para iniciar la actividad de listening
 */
const startActiviy = (e) => {
  e.preventDefault();
  categoriaInput = categoria.value;
  orderInput = order.value;
  cantidadInput = cantidad.value;

  console.log(categoriaInput, orderInput, cantidadInput);
  filterListQuestion(listWords);
  if (orderInput === "aleatorio") {
    randomOrder(listquestion);
    filteredByNumberOfSelectedQuestions(listquestion, cantidadInput);
    console.table(listquestion);
  } else if (orderInput === "menos reproducidas") {
    orderByLeastPlayed(listquestion);
    filteredByNumberOfSelectedQuestions(listquestion, cantidadInput);

    console.table(listquestion);
  } else if (orderInput === "menos aciertos") {
    orderByHit(listquestion);
    filteredByNumberOfSelectedQuestions(listquestion, cantidadInput);
    console.table(listquestion);
  }

  closeModal();
  sectionEjercicios.classList.add("ocultar");
  sectionListening.classList.remove("ocultar");
};

/*
 *Función para filtar la lista de preguntas por categoria
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
  console.log(orderedListing);
};

/*
 *Eventos
 */
actividadUno.addEventListener("click", openModal);
span.addEventListener("click", closeModal);
btnForm.addEventListener("click", startActiviy);
