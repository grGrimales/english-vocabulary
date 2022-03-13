import { sectionForm } from "../js/index.js";

/*
 *Función para mostra error en el formulario de Vocabulary
 */
export const showErrrorFormVocabulary = (error) => {
  const contenedorErr = document.createElement("div");
  const messageError = document.createElement("p");
  messageError.textContent = error;
  contenedorErr.appendChild(messageError);
  contenedorErr.classList.add("error", "cont-err");
  sectionForm.appendChild(contenedorErr);
  console.log(contenedorErr);

  setTimeout(() => {
    contenedorErr.remove();
    contError.classList.remove("error");
  }, 2000);
};
