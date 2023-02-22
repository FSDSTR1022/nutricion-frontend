import './App.css';
import FormExercise from './Components/formExercise';
import Listexercises from './Components/listExercise';
import NewRoutine from './Components/formRoutine';
import HomePage from './Components/homePage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

function App() {
	const [exerciseToAddUS, setexerciseToAddUS] = useState([]);
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					{/* <Route path="/Ejercicios" element={<Listexercises/>}/> */}
					<Route
						path='/Ejercicios'
						element={
							<Listexercises
								action={'selectexercise'}
								exercisesToAdd={exerciseToAddUS}
								setexerciseToAdd={
									setexerciseToAddUS
								} /* setOpenDialog={setOpenSelectexerciseDialog} */
							></Listexercises>
						}
					/>
					<Route path='/Ejercicios/Ejercicio' element={<FormExercise />} />
					<Route path='/Rutina' element={<NewRoutine action={'newRutine'} />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
