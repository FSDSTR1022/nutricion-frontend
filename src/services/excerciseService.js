let URLnuevoEjercicio = "http://localhost:3000/Ejercicios/NuevoEjercicio";
let URLejercicios = "http://localhost:3000/Ejercicios";

const getExcerciseAtribut = function () {
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

const saveExcercise = function (data) {
  const excercise = JSON.stringify(data);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: excercise,
  };
  fetch(URLnuevoEjercicio, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

const getExcercise = function(){
  
  return fetch(URLejercicios)
    .then((response) => response.json())
    .then((jsonData) => {
      //console.log("EN servicio",jsonData)
      return jsonData;
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
}

module.exports = { getExcerciseAtribut, saveExcercise,getExcercise };
