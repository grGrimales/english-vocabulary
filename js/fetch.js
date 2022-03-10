/* Función para realizar peticiones https sin token*/

const baseUrl = "https://my-vocabulary-api.herokuapp.com/api";
export const fetchSinToken = (endpoint, data, method = "GET") => {
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

/* Función para realizar peticiones https con token*/
export const fetchConToken = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  // console.log(url);
  const token = localStorage.getItem("token") || "";
  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    try {
      return fetch(url, {
        method,
        headers: {
          "Content-type": "application/json",
          "x-token": token,
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  }
};
