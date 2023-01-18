let URL = 'http://localhost:3000/professionals';

// GET PROFESSIONALS & GET PROFESSIONAL BY ID
const getProfessionals = function (id) {
	if (id) {
		URL = URL + `/${id}`;
	}

	return fetch(URL)
		.then(res => res.json())
		.then(data => {
			const professionals = data.professional;
			return professionals;
		})
		.catch(error => {
			console.log(error);
		});
};

// POST PROFESSIONAL
const postProfessionals = function (data) {
	const professional = JSON.stringify(data);

	return fetch(URL, {
		method: 'POST',
		body: professional,
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
const putProfessionals = function (id, data) {
	URL = URL + `/${id}`;

	const professional = JSON.stringify(data);

	return fetch(URL, {
		method: 'PUT',
		body: professional,
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
const deleteProfessionals = function (id) {
	URL = URL + `/${id}`;

	return fetch(URL, {
		method: 'DELETE',
	})
		.then(respuesta => respuesta.json())
		.catch(error => {
			console.log(error);
		});
};

module.exports = {
	getProfessionals,
	postProfessionals,
	putProfessionals,
	deleteProfessionals,
};
