import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './components/view/Home';
import Login from './components/view/Login';
import Register from './components/view/Register';
import Dashboard from './components/view/Dashboard';

function App() {
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
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
