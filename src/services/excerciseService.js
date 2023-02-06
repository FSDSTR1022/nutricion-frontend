let URLEjercicio = "http://localhost:3000/Ejercicios/Ejercicio";
let URLejercicios = "http://localhost:3000/Ejercicios";


const getExcerciseAtribut = function () {
  return fetch(URLEjercicio)
    .then((response) => response.json())
    .then((jsonData) => {
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

  return fetch(URLEjercicio, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      //console.log("DATA en service:",data)
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

const updateExcercise = function(data){
  const excercise = JSON.stringify(data);

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: excercise,
  };

  let URLEjercicio2 = "http://localhost:3000/Ejercicios/Ejercicio?id="+data._id;

  return fetch(URLEjercicio2, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
}

const deleteExcercise = function(data){
  const excercise = JSON.stringify(data);

  const requestOptions = {
    method: "DELETE",
    headers: {'Content-Type': 'application/json'},
    body: excercise,
  };

  let URLEjercicio2 = "http://localhost:3000/Ejercicios/Ejercicio?_id="+data._id;

  return fetch(URLEjercicio2, requestOptions)
    .then((response) => ({data:response.json(),status:response.status})) 
    .catch((error) => {
    return error;
  });
}

module.exports = { getExcerciseAtribut, saveExcercise,getExcercise,updateExcercise,deleteExcercise};
