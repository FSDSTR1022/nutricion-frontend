const URLPaciente = `${process.env.REACT_APP_BACK_URL}/users`;

const savePatient = async data => {
	const patient = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: patient,
	};

	try {
		const response = await fetch(URLPaciente, requestOptions);
		return { data: response.json(), status: response.status };
	} catch (error) {
		return error;
	}
};

const getPatients = async () => {
	try {
		const response = await fetch(URLPaciente);
		const jsonData = await response.json();
		return jsonData;
	} catch (e) {
		return e;
	}
};

const updatePatient = async data => {
	const routine = JSON.stringify(data);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: routine,
	};

	const URLEjercicio2 = `${process.env.REACT_APP_BACK_URL}/patients/${data._id}`;

	try {
		const response = await fetch(URLEjercicio2, requestOptions);
		return { data: response.json(), status: response.status };
	} catch (error) {
		return error;
	}
};

const deletePatient = async data => {
	const routine = JSON.stringify(data);

	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: routine,
	};

	const URLEjercicio2 = `${process.env.REACT_APP_BACK_URL}/patients/${data._id}`;

	try {
		const response = await fetch(URLEjercicio2, requestOptions);
		return { data: response.json(), status: response.status };
	} catch (error) {
		return error;
	}
};

module.exports = { savePatient, getPatients, updatePatient, deletePatient };
