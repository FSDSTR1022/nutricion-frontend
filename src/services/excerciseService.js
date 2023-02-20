const URLEjercicio = 'http://localhost:3000/Ejercicios/Ejercicio';
const URLejercicios = 'http://localhost:3000/Ejercicios';

/* Devuelve
 */
const getExcerciseAtribut = async function () {
	return await fetch(URLEjercicio)
		.then(response => response.json())
		.then(jsonData => {
			return jsonData;
		})
		.catch(e => {
			console.log(e);
			return e;
		});
};

const saveExcercise = async function (data) {
	const excercise = JSON.stringify(data);

	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: excercise,
	};

	return await fetch(URLEjercicio, requestOptions)
		.then(response => response.json())
		.then(data => {
			return data;
		})
		.catch(error => {
			return error;
		});
};

const getExcercise = async function () {
	return await fetch(URLejercicios)
		.then(response => response.json())
		.then(jsonData => {
			return jsonData;
		})
		.catch(e => {
			console.log(e);
			return e;
		});
};

const updateExcercise = async function (data) {
	const excercise = JSON.stringify(data);

	console.log('EJERCICIO en SERVICIO: ', excercise);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: excercise,
	};

	const URLEjercicio2 =
		'http://localhost:3000/Ejercicios/Ejercicio?id=' + data._id;

	return await fetch(URLEjercicio2, requestOptions)
		.then(response => response.json())
		.then(data => {
			console.log('DATA en service:', data);
			return data;
		})
		.catch(error => {
			return error;
		});
};

const registerUser = async function (data) {
	const userInfo = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: userInfo,
	};

	return await fetch(
		'http://localhost:3000/professionals/register',
		requestOptions
	)
		.then(response => response.json())
		.then(data => {
			return data._id;
		})
		.catch(error => {
			return error;
		});
};

const getDisciplines = async function () {
	return await fetch('http://localhost:3000/disciplines/')
		.then(response => response.json())
		.then(data => {
			return data.discipline;
		})
		.catch(e => {
			console.log(e);
			return e;
		});
};

const loginUser = async function (data) {
	const userInfo = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: userInfo,
	};

	return await fetch(
		'http://localhost:3000/professionals/login',
		requestOptions
	)
		.then(response => response.json())
		.then(data => {
			return data.token;
		})
		.catch(error => {
			return error;
		});
};

module.exports = {
	getExcerciseAtribut,
	saveExcercise,
	getExcercise,
	updateExcercise,
	registerUser,
	getDisciplines,
	loginUser,
};
