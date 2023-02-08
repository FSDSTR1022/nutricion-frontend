import './App.css';
import FormExercise from "./Components/formExercise"
import ListExercises from "./Components/listExcercise"
import HomePage from "./Components/homePage"
import { Route, Routes,BrowserRouter } from  "react-router-dom"

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/Ejercicios" element={<ListExercises/>}/>
        <Route path="/Ejercicios/Ejercicio" element={<FormExercise/>}/>
      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
