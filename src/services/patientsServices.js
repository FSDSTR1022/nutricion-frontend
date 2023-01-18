let URL = 'http://localhost:3000/patients';

// GET PATIENTS & GET PROFESSIONAL BY ID
const getPatients = function (id) {
	if (id) {
		URL = URL + `/${id}`;
	}

	return fetch(URL)
		.then(res => res.json())
		.then(data => {
			const patients = data.patient;
			return patients;
		})
		.catch(error => {
			console.log(error);
		});
};

// POST PATIENT
const postPatients = function (data) {
	const patient = JSON.stringify(data);

	return fetch(URL, {
		method: 'POST',
		body: patient,
		headers: {
			'Content-type': 'application/json',
		},
	})
		.then(response => response.json())
		.then(info => console.log('info', info))
		.cathc(error => {
			console.log(error);
		});
};

// PUT PROFESSIONAL
const putPatients = function (id, data) {
	URL = URL + `/${id}`;

	const patients = JSON.stringify(data);

	return fetch(URL, {
		method: 'PUT',
		body: patients,
		headers: {
			'Content-type': 'application/json',
		},
	})
		.then(response => response.json())
		.then(info => console.log('info', info))
		.catch(error => {
			console.log(error);
		});
};

// DELETE PROFESSIONAL
const deletePatients = function (id) {
	URL = URL + `/${id}`;

	return fetch(URL, {
		method: 'DELETE',
	})
		.then(respuesta => respuesta.json())
		.catch(error => {
			console.log(error);
		});
};

module.exports = { getPatients, postPatients, putPatients, deletePatients };
