import './App.css';
import FormExercise from "./Components/formExercise"
import ListExercises from "./Components/listExcercise"
import Button from '@mui/material/Button';
import { border } from '@mui/system';

function App() {
  return (
    <div>
      {/* //<Button variant="contained">Hello World</Button> */}
    <ListExercises/>
    <FormExercise/>
     
    </div>
  );
}

export default App;
