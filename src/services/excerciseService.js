let URLnuevoEjercicio = "http://localhost:3000/Ejercicios/NuevoEjercicio";

const getAtributosEjercicios = function () {
  return fetch(URLnuevoEjercicio)
    .then((response) => response.json())
    .then((jsonData) => {
      //console.log("EN servicio",jsonData)
      return jsonData;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
};

module.exports = { getAtributosEjercicios };
