const getAllUsers = async () => {
	const result = await fetch(`${process.env.REACT_APP_BACK_URL}/users/all`);
	const parseResult = await result.json();
	const data = { data: parseResult, status: result.status };

	return data;
};

const getUserById = async id => {
	const requestOptions = {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
	};

	try {
		const response = await fetch(
			`${process.env.REACT_APP_BACK_URL}/users/user/${id}`,
			requestOptions
		);

		return await response.json();
	} catch (error) {
		return error;
	}
};

const registerUser = async data => {
	const patient = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: patient,
	};

	try {
		const response = await fetch(
			`${process.env.REACT_APP_BACK_URL}/users`,
			requestOptions
		);
		return { data: response.json(), status: response.status };
	} catch (error) {
		return error;
	}
};

const loginUser = async data => {
	const userInfo = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: userInfo,
	};

	try {
		const response = await fetch(
			`${process.env.REACT_APP_BACK_URL}/users/login`,
			requestOptions
		);
		return response.json();
	} catch (error) {
		return error;
	}
};

const updateUser = async data => {
	const user = JSON.stringify(data);
	console.log('SERVICE data:', data);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: user,
	};

	try {
		const response = await fetch(
			`${process.env.REACT_APP_BACK_URL}/users/${data.id}`,
			requestOptions
		);
		return { data: response.json(), status: response.status };
	} catch (error) {
		return error;
	}
};

const getUserByProfesional = async data => {
	try {
		const response = await fetch(
			`${process.env.REACT_APP_BACK_URL}/users/${data._id}`
		);
		const jsonData = { data: response.json(), status: response.status };
		return jsonData;
	} catch (error) {
		return error;
	}
};

export {
	getAllUsers,
	registerUser,
	updateUser,
	getUserByProfesional,
	loginUser,
	getUserById,
};
