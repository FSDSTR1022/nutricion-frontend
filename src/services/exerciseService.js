/* eslint-disable arrow-body-style */
const URL= 'http://localhost:3000'

const getExerciseAtribut = async() =>{
	const result = await fetch(`${URL}/exercises/exerciseAtributes`)
	const parseResult = await result.json()
	const data = {data: parseResult, status: result.status}

	return data
};

const saveExercise = async (data) =>{
	const exercise = JSON.stringify(data);
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: exercise,
	};

	const result = await fetch(`${URL}/exercises`,requestOptions)
	const parseResult = await result.json()
	const data2 = {data: parseResult, status: result.status}
	return data2

};

const getExercise = async () => {

	const result = await fetch(`${URL}/exercises`)
	const parseResult = await result.json()
	const data = {data: parseResult, status: result.status}

	return data

};

const updateExercise = async (data) => {
	const exercise = JSON.stringify(data);

	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: exercise,
	};

	const result = await fetch(`${URL}/exercises?id=${data._id}`, requestOptions)
	const parseResult = await result.json()
	const data2 = {data: parseResult, status: result.status}
	return data2
};

const deleteExercise =  (data) => {
	const exercise = JSON.stringify(data);

	const requestOptions = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: exercise,
	};

	return fetch(`${URL}/exercises?id=${data._id}`, requestOptions)
		.then(response => ({ data: response.json(), status: response.status }))
		.catch(error => {
			return error;
		});
};

module.exports = {
	getExerciseAtribut,
	saveExercise,
	getExercise,
	updateExercise,
	deleteExercise,
};
