/* Inicia funcionalidad de login */

/* Referencia al Html*/

const btnLogin = document.querySelector(".btn-login");
const btnHome = document.querySelector(".btn-home");
const btnPrueba = document.querySelector(".btn-prueba");

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const contenedorLogin = document.querySelector(".contenedor-login");

const modalLogin = document.getElementById("modalLogin");
const spanLogin = document.getElementsByClassName("login")[0];

/* Declaración de variables*/
const emailInput = "";
const passwordInput = "";
const baseUrl = "https://my-vocabulary-api.herokuapp.com/api";

/* Función para realizar peticiones https sin token*/
const fetchSinToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

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
  formData = {
    email: email.value,
    password: password.value,
  };

  if (formData.email === "" || formData.password === "") {
    console.log("* Todos los campos son requqridos");
    showMessage("* Todos los campos son requeridos", "err");
    return;
  }
  const resp = await fetchSinToken("auth/login", formData, "POST");
  const body = await resp.json();
  if (body.ok) {
    localStorage.setItem("token", body.user.token);
    showMessage("Inicio de sesión exitoso", "success");
  } else {
    console.log("Ususario o contraseña incorrecta");
    showMessage("Ususario o contraseña incorrecta", "err");
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
  } else {
    console.log("es otro tipo");
  }

  setTimeout(() => {
    divMessage.remove();
  }, 2000);
};
const prueba = () => {
  window.open("/english-vocabulary/pages/login.html");
};
/*
 *Eventos
 */
btnLogin.addEventListener("click", startLogin);
btnHome.addEventListener("click", openModalLogin);
btnPrueba.addEventListener("click", prueba);

spanLogin.addEventListener("click", closeModalLogin);
