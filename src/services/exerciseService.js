const URLEjercicio = 'http://localhost:3000/Ejercicios/Ejercicio';
const URLejercicios = 'http://localhost:3000/Ejercicios';

const getexerciseAtribut = function () {
	return fetch(URLEjercicio)
		.then(response => response.json())
		.then(jsonData => {
			return jsonData;
		})
		.catch(e => {
			console.log(e);
			return e;
		});
};

const saveexercise = function (data) {
	const exercise = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: exercise,
	};

	return fetch(URLEjercicio, requestOptions)
		.then(response => response.json())
		.then(data => {
			return data;
		})
		.catch(error => {
			return error;
		});
};

const getexercise = function () {
	return fetch(URLejercicios)
		.then(response => response.json())
		.then(jsonData => {
			return jsonData;
		})
		.catch(e => {
			console.log(e);
			return e;
		});
};

const updateexercise = function (data) {
	const exercise = JSON.stringify(data);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: exercise,
	};

	const URLEjercicio2 =
		'http://localhost:3000/Ejercicios/Ejercicio?id=' + data._id;

	return fetch(URLEjercicio2, requestOptions)
		.then(response => response.json())
		.then(data => {
			return data;
		})
		.catch(error => {
			return error;
		});
};

const deleteexercise = function (data) {
	const exercise = JSON.stringify(data);

	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: exercise,
	};

	const URLEjercicio2 =
		'http://localhost:3000/Ejercicios/Ejercicio?_id=' + data._id;

	return fetch(URLEjercicio2, requestOptions)
		.then(response => ({ data: response.json(), status: response.status }))
		.catch(error => {
			return error;
		});
};

module.exports = {
	getexerciseAtribut,
	saveexercise,
	getexercise,
	updateexercise,
	deleteexercise,
};
