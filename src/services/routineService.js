const URLRutina = `${process.env.BASE_URL}/rutinas`;

const saveRutine = async data => {
	const routine = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: routine,
	};

	try {
		const response = await fetch(URLRutina, requestOptions);
		return { data: response.json(), status: response.status };
	} catch (error) {
		return error;
	}
};

const getRutines = async () => {
	try {
		const response = await fetch(URLRutina);
		const jsonData = { data: response.json(), status: response.status };
		console.log(jsonData);
		return jsonData;
	} catch (e) {
		console.log(e);
		return e;
	}
};

const updateRutine = async data => {
	const routine = JSON.stringify(data);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: routine,
	};

	const URLEjercicio2 = `http://localhost:3001/Rutina?id=${data._id}`;

	try {
		const response = await fetch(URLEjercicio2, requestOptions);
		return { data: response.json(), status: response.status };
	} catch (error) {
		return error;
	}
};

const deleteRutine = async data => {
	const routine = JSON.stringify(data);

	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: routine,
	};

	const URLEjercicio2 = `http://localhost:3001/Rutina?id=${data._id}`;

	try {
		const response = await fetch(URLEjercicio2, requestOptions);
		return { data: response.json(), status: response.status };
	} catch (error) {
		return error;
	}
};

module.exports = { saveRutine, getRutines, updateRutine, deleteRutine };
