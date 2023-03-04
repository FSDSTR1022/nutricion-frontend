/* eslint-disable arrow-body-style */
const UserURL = 'http://localhost:3000';

const getAllUsers = async () => {
	const result = await fetch(`${UserURL}/users/all`);
	const parseResult = await result.json();
	const data = { data: parseResult, status: result.status };

	return data;
};

const createUser = data => {
	const patient = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: patient,
	};

	return fetch(UserURL, requestOptions)
		.then(response => ({ data: response.json(), status: response.status }))
		.then(data => {
			return data;
		})
		.catch(error => {
			return error;
		});
};

const updateUser = data => {
	const user = JSON.stringify(data);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: user,
	};

	return fetch(`${UserURL}/users/${data._id}`, requestOptions)
		.then(response => ({ data: response.json(), status: response.status }))
		.then(data => {
			return data;
		})
		.catch(error => {
			return error;
		});
};

const getUserByProfesional = data => {
	return fetch(`${UserURL}/users/${data._id}`)
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

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	getUserByProfesional,
};
