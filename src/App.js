import './App.css';
import Patient from './components/Patients/Patient';
import Discipline from './components/Disciplines/Discipline';
import Professional from './components/Professionals/Professional';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<h1>Hola mundo!</h1>
				<h2>PACIENTES</h2>
				<Patient />
				<h2>DISCIPLINAS</h2>
				<Discipline />
				<h2>PROFESSIONALES</h2>
				<Professional />
			</header>
		</div>
	);
}

export default App;
