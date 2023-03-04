const UserURL = 'http://localhost:3000';

const getAllUsers = async () => {
	const result = await fetch(`${UserURL}/users/all`);
	const parseResult = await result.json();
	const data = { data: parseResult, status: result.status };

	return data;
};

const createUser = async data => {
	const patient = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: patient,
	};

	try {
		const response = await fetch(UserURL, requestOptions);
		return { data: response.json(), status: response.status };
	} catch (error) {
		return error;
	}
};

const updateUser = async data => {
	const user = JSON.stringify(data);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: user,
	};

	try {
		const response = await fetch(
			`${UserURL}/users/${data._id}`,
			requestOptions
		);
		return { data: response.json(), status: response.status };
	} catch (error) {
		return error;
	}
};

const getUserByProfesional = async data => {
	try {
		const response = await fetch(`${UserURL}/users/${data._id}`);
		const jsonData = { data: response.json(), status: response.status };
		return jsonData;
	} catch (error) {
		return error;
	}
};

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	getUserByProfesional,
};
