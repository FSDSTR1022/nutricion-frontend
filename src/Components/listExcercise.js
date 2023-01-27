import { getExcercise} from "../services/excerciseService";
import { useEffect, useState } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';



const ListExercises = () =>{
  const [isLoading, setIsLoading] = useState(true);
  const [excerciseListUS,setExcerciseListUS] = useState();

  useEffect(() => {
    getExcercise().then((data) => {
      setExcerciseListUS(data);
      setIsLoading(false);
    });
  }, []);

  const handleClickView = (evento)=>{
    console.log("Vista: ",evento)
  }

  const handleClickEdit = (evento)=>{
    console.log("edición: ",evento)
  }

  const handleClickDelte = (evento)=>{
    console.log("borrar: ",evento)
  }
  

  const handleClickFila = (evento)=>{
    console.log("FIla: ",evento)
  }


  if (!isLoading) {
    return(
      <div>
        <h1>Listado de ejercicios!</h1>
{/*         {console.log(excerciseListUS)} */}
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Ejercicio</TableCell>
            <TableCell align="center">Tipo de Ejercicio</TableCell>
            <TableCell align="center">Dificultad</TableCell>
             <TableCell align="center">Partes del Cuerpo</TableCell>
             <TableCell align="center">Equipamiento</TableCell>
            <TableCell align="center">Explicación</TableCell>
            <TableCell align="center">Precauciones </TableCell>
            <TableCell align="center">Demostración</TableCell>
            <TableCell align="center">Ver</TableCell>
            <TableCell align="center">Modificar</TableCell>
            <TableCell align="center">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {excerciseListUS.map((excercise) => (
            <TableRow
              key={excercise._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={handleClickFila}
              >
              <TableCell component="th" scope="row">{excercise.name} </TableCell>
              <TableCell align="center">{excercise.exerciseType.exerciseType}</TableCell>
              <TableCell align="center">{excercise.difficulty.exerciseDifficulty}</TableCell>
              <TableCell align="center">{
                excercise.bodyParts.map((part)=>{
                  return part.bodyPart+", ";
                })
              }</TableCell>
              <TableCell align="center">{
                excercise.equipments.map((part)=>{
                  return part.exerciseEquipment+", ";
                })
              }</TableCell>
              <TableCell align="center">{excercise.explanation}</TableCell>
              <TableCell align="center">{excercise.precautions}</TableCell>
              <TableCell align="center">{excercise.video + excercise.photo }</TableCell>
              <TableCell align="center"  onClick={handleClickView}>{<SearchIcon/>}</TableCell>
               <TableCell align="center">{<EditIcon onClick={handleClickEdit}/>}</TableCell>
               <TableCell align="center"><DeleteOutlinedIcon onClick={handleClickDelte}/></TableCell>
             {/* <TableCell align="center">{Eliminar}</TableCell> */}
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>  
    </div>
      
  )
  }
  else {
    return <h1>CARGANDO</h1>;
  }

  

    
}

export default ListExercises;