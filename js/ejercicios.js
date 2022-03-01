/*
 *Referencias al html
 */
const modal = document.getElementById("myModal");
const actividadUno = document.querySelector("#actividad-uno");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const btnListening = document.querySelector("#btnListening");
const sectionEjercicios = document.querySelector(".section-ejercicios");
const sectionListening = document.querySelector(".section-listening");

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

/*
 *Función para iniciar la actividad de listening
 */
const startActiviy = (e) => {
  e.preventDefault();
  console.log("funciona");
  closeModal();
  sectionEjercicios.classList.add("ocultar");
  sectionListening.classList.remove("ocultar");
};

/*
 *Eventos
 */
actividadUno.addEventListener("click", openModal);
span.addEventListener("click", closeModal);
btnListening.addEventListener("click", startActiviy);
