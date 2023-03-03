const URLUsers = 'http://localhost:3000/users';

const loginUser = async data => {
	const userInfo = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: userInfo,
	};

	try {
		const res = await fetch(`${URLUsers}/login`, requestOptions);
		return res.json();
	} catch (error) {
		return error;
	}
};

const registerUser = async data => {
	const userInfo = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: userInfo,
	};

	try {
		const res = await fetch(URLUsers, requestOptions);
		return res.json();
	} catch (error) {
		return error;
	}
};

module.exports = { registerUser, loginUser };
