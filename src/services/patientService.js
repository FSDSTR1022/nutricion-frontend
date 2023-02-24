/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
const URLPaciente = 'http://localhost:3000/patients';

const savePatient = data => {
	const patient = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: patient,
	};

	return fetch(URLPaciente, requestOptions)
		.then(response => ({ data: response.json(), status: response.status }))
		.then(data => {
			return data;
		})
		.catch(error => {
			return error;
		});
};

const getPatients = () => {
	return fetch(URLPaciente)
		.then(response => response.json())
		.then(jsonData => {
			return jsonData;
		})
		.catch(e => {
			return e;
		});
};

const updatePatient = data => {
	const routine = JSON.stringify(data);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: routine,
	};

	const URLEjercicio2 = `http://localhost:3001/patients/${data._id}`;

	return fetch(URLEjercicio2, requestOptions)
		.then(response => ({ data: response.json(), status: response.status }))
		.then(data => {
			return data;
		})
		.catch(error => {
			return error;
		});
};

const deletePatient = data => {
	const routine = JSON.stringify(data);

	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: routine,
	};

	const URLEjercicio2 = `http://localhost:3001/patients/${data._id}`;

	return fetch(URLEjercicio2, requestOptions)
		.then(response => ({ data: response.json(), status: response.status }))
		.catch(error => {
			return error;
		});
};

module.exports = { savePatient, getPatients, updatePatient, deletePatient };
