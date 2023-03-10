const getExerciseAtribut = async () => {
	const result = await fetch(
		`${process.env.REACT_APP_BACK_URL}/exercises/exerciseAtributes`
	);
	const parseResult = await result.json();
	const data = { data: parseResult, status: result.status };

	return data;
};

const saveExercise = async data => {
	const exercise = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: exercise,
	};

	const result = await fetch(
		`${process.env.REACT_APP_BACK_URL}/exercises`,
		requestOptions
	);
	const parseResult = await result.json();
	const data2 = { data: parseResult, status: result.status };
	return data2;
};

const getExercise = async () => {
	const result = await fetch(`${process.env.REACT_APP_BACK_URL}/exercises`);
	const parseResult = await result.json();
	const data = { data: parseResult, status: result.status };

	return data;
};

const updateExercise = async data => {
	const exercise = JSON.stringify(data);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: exercise,
	};

	const result = await fetch(
		`${process.env.REACT_APP_BACK_URL}/exercises?id=${data._id}`,
		requestOptions
	);
	const parseResult = await result.json();
	const data2 = { data: parseResult, status: result.status };
	return data2;
};

const deleteExercise = async data => {
	const exercise = JSON.stringify(data);

	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: exercise,
	};

	const result = await fetch(
		`${process.env.REACT_APP_BACK_URL}/exercises?_id=${data._id}`,
		requestOptions
	);
	const parseResult = await result.json();
	const data2 = { data: parseResult, status: result.status };
	return data2;
};

export {
	getExerciseAtribut,
	saveExercise,
	getExercise,
	updateExercise,
	deleteExercise,
};
