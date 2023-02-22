/* eslint-disable no-unused-vars */
const URLRutina = 'http://localhost:3000/Rutinas';

const saveRutine = function (data) {
	console.log('PARAMETRO: ', data);
	const routine = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: routine,
	};

	return fetch(URLRutina, requestOptions)
		.then(response => ({ data: response.json(), status: response.status }))
		.then(data => {
			return data;
		})
		.catch(error => {
			return error;
		});
};

const getRutines = function () {
	return fetch(URLRutina)
		.then(response => ({ data: response.json(), status: response.status }))
		.then(jsonData => {
			console.log(jsonData);
			return jsonData;
		})
		.catch(e => {
			console.log(e);
			return e;
		});
};

const updateRutine = function (data) {
	const routine = JSON.stringify(data);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: routine,
	};

	const URLEjercicio2 = 'http://localhost:3001/Rutina?id=' + data._id;

	return fetch(URLEjercicio2, requestOptions)
		.then(response => ({ data: response.json(), status: response.status }))
		.then(data => {
			return data;
		})
		.catch(error => {
			return error;
		});
};

const deleteexercise = function (data) {
	const routine = JSON.stringify(data);

	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: routine,
	};

	const URLEjercicio2 = 'http://localhost:3001/Rutina?id=' + data._id;

	return fetch(URLEjercicio2, requestOptions)
		.then(response => ({ data: response.json(), status: response.status }))
		.catch(error => {
			return error;
		});
};

module.exports = { saveRutine, getRutines, updateRutine, deleteexercise };
