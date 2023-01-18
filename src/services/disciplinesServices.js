let URL = 'http://localhost:3000/disciplines';

// GET PROFESSIONALS & GET PROFESSIONAL BY ID
const getDisciplines = function (id) {
	if (id) {
		URL = URL + `/${id}`;
	}

	return fetch(URL)
		.then(res => res.json())
		.then(data => {
			const disciplines = data.discipline;
			return disciplines;
		})
		.catch(error => {
			console.log(error);
		});
};

// POST PROFESSIONAL
const postDisciplines = function (data) {
	const discipline = JSON.stringify(data);

	return fetch(URL, {
		method: 'POST',
		body: discipline,
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
const putDisciplines = function (id, data) {
	URL = URL + `/${id}`;

	const discipline = JSON.stringify(data);

	return fetch(URL, {
		method: 'PUT',
		body: discipline,
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
const deleteDisciplines = function (id) {
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
	getDisciplines,
	postDisciplines,
	putDisciplines,
	deleteDisciplines,
};
