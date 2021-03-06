/* Inicia funcionalidad de login */
import { fetchSinToken, fetchConToken } from "../js/fetch.js";

/* Referencias al Html*/
const btnLogin = document.querySelector(".btn-login");
const btnHome = document.querySelector(".btn-home");
const btnPrueba = document.querySelector(".btn-prueba");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const contenedorLogin = document.querySelector(".contenedor-login");
const sectionHome = document.querySelector(".section-home");
const modalLogin = document.getElementById("modalLogin");
const spanLogin = document.getElementsByClassName("login")[0];
const optionsMenu = document.querySelector(".options__menu");
let token = "";
export let isLogged = false;

/*
 *Función para abrir la ventana modal
 */
const openModalLogin = () => {
  modalLogin.style.display = "block";
};

/*
 *Función para cerrar la ventana modal
 */
const closeModalLogin = () => {
  modalLogin.style.display = "none";
};

/* Función para iniciar sesión*/
const startLogin = async (e) => {
  e.preventDefault();
  const formData = {
    email: email.value,
    password: password.value,
  };
  const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (formData.email === "" || formData.password === "") {
    showMessage("* Todos los campos son requeridos", "err");
    return;
  } else if (!er.test(formData.email)) {
    showMessage("* Email no válido", "err");
    return;
  } else {
    const resp = await fetchSinToken("auth/login", formData, "POST");
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.user.token);
      showMessage("Inicio de sesión exitoso", "success");
      isLogged = true;
      localStorage.setItem("isLogged", isLogged);
      printMenu();
      getListOfWords();
      sectionHome.classList.remove("ocultar");
      contenedorLogin.classList.add("ocultar");
    } else {
      showMessage("Ususario o contraseña incorrecta", "err");
    }
  }
};

/* Función para mostar mensaje*/
const showMessage = (message, tipo) => {
  const divMessage = document.createElement("div");
  divMessage.classList.add("contenedor-msj");
  const parrafoMessage = document.createElement("p");
  parrafoMessage.textContent = message;
  divMessage.appendChild(parrafoMessage);
  contenedorLogin.appendChild(divMessage);
  if (tipo === "err") {
    divMessage.classList.add("error");
  } else if (tipo === "success") {
    divMessage.classList.add("success");
  }

  setTimeout(() => {
    divMessage.remove();
  }, 2000);
};

/* Función para crear menu*/

const printMenu = () => {
  let menu = document.createElement("div");
  menu.innerHTML = `
  <a href="" class="selected">
  <div class="option">
    <i class="fas fa-home" title="Inicio"></i>
    <h4>Inicio</h4>
  </div>
</a>
<a href="pages/vocabulary.html">
  <div class="option">
    <i class="fas fa-chalkboard-teacher" title="Vocabulario"></i>
    <h4>Vocabulario</h4>
  </div>
</a>

<a href="pages/ejercicios.html">
  <div class="option">
    <i class="fas fa-clipboard-list" title="Ejercicios"></i>
    <h4>Ejercicios</h4>
  </div>
</a>

<a href="pages/videos.html">
  <div class="option">
    <i class="fas fa-video" title="Vídeos"></i>
    <h4>Vídeos</h4>
  </div>
</a> 
  `;

  if (optionsMenu.lastElementChild) {
    optionsMenu.lastElementChild.remove();
  }
  optionsMenu.appendChild(menu);
};

/* Función para verificar si esxite el token en el localStorage*/
const verifyTokenInLocalStorage = () => {
  token = localStorage.getItem("token");

  if (token != null) {
    isLogged = true;
    localStorage.setItem("isLogged", isLogged);
    printMenu();
    sectionHome?.classList.remove("ocultar");
    contenedorLogin?.classList.add("ocultar");
  } else {
    isLogged = false;
    localStorage.setItem("isLogged", isLogged);
    contenedorLogin?.classList.remove("ocultar");
    sectionHome?.classList.add("ocultar");
  }
};

verifyTokenInLocalStorage();

/*
 *Eventos
 */
btnLogin?.addEventListener("click", startLogin);
btnHome?.addEventListener("click", openModalLogin);
btnPrueba?.addEventListener("click", prueba);
spanLogin?.addEventListener("click", closeModalLogin);

/* Inicia funcionalidad de register */

/* Referencias al Html*/
const rName = document.querySelector("#rName");
const rEmail = document.querySelector("#rEmail");
const rPassword = document.querySelector("#rPassword");
const btnRegister = document.querySelector(".btn-register");

/*
 *Función para el registro
 */
const startRegister = async (e) => {
  e.preventDefault();
  const inputName = rName.value;
  const inputEmail = rEmail.value;
  const inputRegister = rPassword.value;

  const formDataRegister = {
    email: inputEmail,
    name: inputName,
    password: inputRegister,
  };

  const { email, name, password } = formDataRegister;

  if (name === "" || email === "" || password === "") {
    showMessage("* Todos los campos son requeridos", "err");
    return;
  }

  const resp = await fetchSinToken("auth/register", formDataRegister, "POST");
  const body = await resp.json();

  if (body.ok) {
    showMessage("Registro exitoso", "success");
    localStorage.setItem("token", body.user.token);
    isLogged = true;
    localStorage.setItem("isLogged", isLogged);
    printMenu();
    getListOfWords();

    setTimeout(() => {
      window.open("/english-vocabulary/index.html", "_self");
    }, 2000);
  } else {
    if (body.errors.length === 2) {
      showMessage(`${body.errors[0].msg} y ${body.errors[1].msg}`, "err");
    } else {
      showMessage(`${body.errors[0].msg}`, "err");
    }
  }
};

/*
 *Función para traer el listado de palabras
 */
const getListOfWords = async () => {
  const resp = await fetchConToken("vocabulary", {});
  const body = await resp.json();
  const listWords = body.vocabularies;

  localStorage.setItem("listWords", JSON.stringify(listWords));
};

/*
 *Eventos
 */
btnRegister?.addEventListener("click", startRegister);
