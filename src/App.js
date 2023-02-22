import './App.css';
import FormExercise from './Components/formExercise';
import Listexercises from './Components/listExercise';
import NewRoutine from './Components/formRoutine';
import HomePage from './Components/homePage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import NavBar from './components/Navbar';
import Home from './components/view/Home';
import Login from './components/view/Login';
import Register from './components/view/Register';
import Dashboard from './components/view/Dashboard';
import Logout from './components/view/Logout';

function App() {
	const [exerciseToAddUS, setexerciseToAddUS] = useState([]);
	return (
		<BrowserRouter>
			<NavBar />
			<div className='App'>
				<Routes>
					<Route
						exact
						path='/'
						element={<Home />}
					/>
					<Route
						exact
						path='/login'
						element={<Login />}
					/>
					<Route
						exact
						path='/register'
						element={<Register />}
					/>
					<Route
						exact
						path='/dashboard'
						element={<Dashboard />}
					/>
					<Route
						exact
						path='/logout'
						element={<Logout />}
					/>

					<Route
						path='/'
						element={<HomePage />}
					/>
					<Route
						path='/Ejercicios'
						element={
							<Listexercises
								action={'selectexercise'}
								exercisesToAdd={exerciseToAddUS}
								setexerciseToAdd={setexerciseToAddUS} 
							></Listexercises>
						}
					/>
					<Route
						path='/Ejercicios/Ejercicio'
						element={<FormExercise />}
					/>
					<Route
						path='/Rutina'
						element={<NewRoutine action={'newRutine'} />}
					/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
