import { getExcercise, getExcerciseAtribut} from "../services/excerciseService";
import { useEffect, useState } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Button,
  Grid,
  Paper
} from '@mui/material';



const ListExercises = () =>{
  const [isLoadingExercise, setIsLoadingExcersice] = useState(true);
  const [isLoadingExerciseAtributes, setIsLoadingExcersiceAtributes] = useState(true);
  const [excerciseListUS,setExcerciseListUS] = useState();
  const [exerciseAtributsUS, setExerciseAtributesUS] = useState([]);
  const [exerciseBodyPartsSearchUS, setExcersiseBodyPartsSearchUS] = useState([]);
  const [exerciseTypeSearchUS, setExerciseTypeSearchUS] = useState("");
  const [exerciseDifficulSearchtUS, setExerciseDifficulSearchUS] = useState("");
  const [exerciseMuclesSearchUS, setExerciseMuclesSearchUS] = useState([]);
  const [exerciseEquipmentsSearchUS, setExerciseEquipmentsSearchUS] = useState([]);
  const [exerciseNameSeachUS, setExerciseSearchNameUS] = useState();
  
  const theme = useTheme();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(() => {
    getExcerciseAtribut().then((data) => {
      setExerciseAtributesUS(data);
      setIsLoadingExcersiceAtributes(false);
    });

    getExcercise().then((data) => {
      setExcerciseListUS(data);
      setIsLoadingExcersice(false);
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

  const handleChangeExerciseNameInput = (event) => {
    setExerciseSearchNameUS(event.target.value);
  };

  const handleChangeExerciseTypeSearch = (event) => {
    setExerciseTypeSearchUS(event.target.value)

    if(event.target.value==="quitarSeleccion")
    {
      excerciseListUS.map((excercise)=>{
        excercise.show = true;
      })

      setExerciseTypeSearchUS("");
      
    }
    else{
      excerciseListUS.map((excercise)=>{               
            if(excercise.exerciseType.exerciseType === event.target.value){
              excercise.show = true;
            }
            else{
              excercise.show = false;
            }
          });
    }
  };

   const handleChangeExerciseDificultSelector = (event) => {
    
    setExerciseDifficulSearchUS(event.target.value)

    if(event.target.value==="quitarSeleccion")
    {
      excerciseListUS.map((excercise)=>{
        excercise.show = true;
      })

      setExerciseDifficulSearchUS("");
      
    }
    else{
      excerciseListUS.map((excercise)=>{               
            if(excercise.difficulty.exerciseDifficulty === event.target.value){
              excercise.show = true;
            }
            else{
              excercise.show = false;
            }
          });
    }
  };

  const handleChangeBodyPartSelector = (event) => {

    const quitarSeleccion=event.target.value.some((valor)=>{
      console.log(valor)
      return valor==="quitarSeleccion" 
    })

    if(quitarSeleccion || event.target.value.length===0)
    {
      console.log("Entro en SI")
      excerciseListUS.map((excercise)=>{
        excercise.show = true;
      })
      setExcersiseBodyPartsSearchUS([])
     
    }      
    else{
        
      const {target: { value },} = event;
      setExcersiseBodyPartsSearchUS(
          typeof value === "string" ? value.split(",") : value,
      );

        excerciseListUS.map((excercise)=>{     
          const mostrarEjercicio = excercise.bodyParts.some((part)=>{
            return event.target.value.some((valor)=>{
              return part.bodyPart===valor
            })
          })

         if(mostrarEjercicio){
          excercise.show = true;
        }
         else{
            excercise.show = false;
          }
        });
      }
    }


    
  
  const handleChangeMuscleSelector = (event) => {
    const {
     target: { value },
   } = event;
   setExerciseMuclesSearchUS(
     typeof value === "string" ? value.split(",") : value
   );
 };

 const handleChangeEquipamiento = (event) => {
  const {
    target: { value },
  } = event;
  setExerciseEquipmentsSearchUS(
    typeof value === "string" ? value.split(",") : value
  );
};

 function getStylesItemSelector(name, partesCuerpo, theme) {
  return {
    fontWeight:
      partesCuerpo.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const drawTableRows = (excercise)=>{

   return (
    <TableRow
        key={excercise._id}
        hover={true}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
    <TableCell component="th" scope="row">{excercise.name} </TableCell>
    <TableCell align="center">{excercise.exerciseType.exerciseType}</TableCell>
    <TableCell align="center">{excercise.difficulty.exerciseDifficulty}</TableCell>
    <TableCell align="center">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {excercise.bodyParts.map((part) => ( 
          <Chip 
              key={part._id} 
              label={part.bodyPart} 
            /> 
        ))}
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {excercise.muscles.map((muscle) => ( 
            <Chip 
                key={muscle._id} 
                label={muscle.muscle} 
              /> 
          ))}
        </Box>
    </TableCell> 
    <TableCell align="center">
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {excercise.equipments.map((equipment) => ( 
          <Chip 
              key={equipment._id} 
              label={equipment.exerciseEquipment} 
            /> 
        ))}
      </Box></TableCell>
    <TableCell align="center">{excercise.explanation}</TableCell>
    <TableCell align="center">{excercise.precautions}</TableCell>
    <TableCell align="center">{excercise.video + excercise.photo }</TableCell>
    <TableCell align="center">
      <SearchIcon 
        onClick={() => (excerciseListUS ? handleClickView(excercise._id) : null)}/>
    </TableCell>
    <TableCell align="center">
      <EditIcon onClick={() => (excerciseListUS ? handleClickEdit(excercise._id) : null)}/>
      </TableCell>
    <TableCell align="center">
      <DeleteOutlinedIcon onClick={() => (excerciseListUS ? handleClickDelte(excercise._id) : null) }/>
      </TableCell>               
  </TableRow>
   )
  }



if (!isLoadingExercise && !isLoadingExerciseAtributes) {
    return(
      <div>
        {console.log(excerciseListUS)} 
        <h1>Listado de ejercicios!</h1>

{/* ///////////////////// FILTROS  ///////////////////// */}
        <div style={{color: 'blue', border:'solid'}}>
          Filtros
          <br></br>

      {/* ///////////////////// FILTRO NOMBRE EJERCICIO ///////////////////// */}     
          <FormControl  sx={{ m: 1, minWidth: 200}}>
            <TextField
              id="standard-basic"
              label="Nombre Ejercicio"
              variant="outlined"
              value={exerciseNameSeachUS}
              onChange={handleChangeExerciseNameInput}
            />
          </FormControl>

      {/* ///////////////////// FILTRO TIPO EJERCICIO ///////////////////// */}     
          <FormControl  sx={{ m: 1, minWidth: 200}}>
              <InputLabel id="tipoEjercicioSelectLabel"> Tipo de Ejercicio </InputLabel>
              <Select
                labelId="excersiceTypeSearchSelectLabel"
                id="excersiceTypeSearch"
                value={exerciseTypeSearchUS}
                label="Dificultad"
                onChange={handleChangeExerciseTypeSearch}
                input={<OutlinedInput id="excersiceTypeSearch" label="Tipo de Ejercicio "/>}
              >
                {exerciseAtributsUS.exerciseType.map((te, id) => (
                  <MenuItem value={te.exerciseType} key={id}>
                    {te.exerciseType}
                  </MenuItem>
                ))}
                <MenuItem value={"quitarSeleccion"}>
                    Quitar Selección
                  </MenuItem>
              </Select>
            </FormControl>

      {/* ///////////////////// FILTRO DIFICULTAD ///////////////////// */}     
            <FormControl  sx={{ m: 1, minWidth: 200}}>
              <InputLabel id="dificultadEjercicioSelectLabel">Dificultad de Ejercicio</InputLabel>
              <Select
                labelId="dificultadEjercicioSelectLabel"
                id="dificultadEjercicioSelect"
                value={exerciseDifficulSearchtUS}
                label="Dificultad Ejercicio"
                onChange={handleChangeExerciseDificultSelector}
                input={ <OutlinedInput id="dificultadEjercicioSelect" label="Dificultad de Ejercicio"/>}
                
              >
                {exerciseAtributsUS.exerciseDifficult.map((de, id) => (
                  <MenuItem value={de.exerciseDifficulty} key={id}>
                    {de.exerciseDifficulty}
                  </MenuItem>
                ))}
                 <MenuItem value={"quitarSeleccion"}>
                    Quitar Selección
                  </MenuItem>
              </Select>
            </FormControl>

     {/* ///////////////////// FILTRO PARTES CUERPO  ///////////////////// */}               
          <FormControl   sx={{ m: 1, minWidth: 200}}>
            <InputLabel id="demo-multiple-chip-label"> Parte del Cuerpo Involucradas </InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={exerciseBodyPartsSearchUS}
              onChange={handleChangeBodyPartSelector}
              input={ <OutlinedInput id="select-multiple-chip" label="Parte del Cuerpo Involucrdas"/>}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => ( 
                     <Chip 
                        key={value} 
                        label={exerciseAtributsUS.bodyParts.map((part)=>{
                              if(part.bodyPart===value) return part.bodyPart
                        }) } 
                      /> 
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {exerciseAtributsUS.bodyParts.map((part) => (
                <MenuItem
                  key={part._id}
                  value={part.bodyPart}
                  style={getStylesItemSelector(part.bodyPart,exerciseBodyPartsSearchUS,theme)}
                >
                  {part.bodyPart}
                </MenuItem>
              ))}
                <MenuItem value={"quitarSeleccion"}>
                    Quitar Selección
                  </MenuItem> 
            </Select>
          </FormControl>

          {/* ///////////////////// FILTRO MUSCULOS INVOLUCRADOS ///////////////////// */}     
          <FormControl   sx={{ m: 1, minWidth: 200}}>
            <InputLabel id="imputLabelMusculosEjercicio">
              Musculos Involucrados
            </InputLabel>
            <Select
              labelId="imputLabelMusculosEjercicio"
              id="selectorMusculosEjercicio"
              multiple
              value={exerciseMuclesSearchUS}
              onChange={handleChangeMuscleSelector}
              input={<OutlinedInput id="imputLabelMusculosEjercicio" label="Musculos Involucrados" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip 
                    key={value} 
                    label={ exerciseAtributsUS.exerciseMucles.map((muscle)=>{
                          if(muscle._id===value) return muscle.muscle
                    }) } 
                  /> 
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {exerciseAtributsUS.exerciseMucles.map((muscle) => (
                <MenuItem
                  key={muscle._id}
                  value={muscle._id}
                  style={getStylesItemSelector(muscle._id,exerciseMuclesSearchUS,theme)}
                >
                  {muscle.muscle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        {/* ///////////////////// FILTRO EQUIPAMIENTO ///////////////////// */}         
        <FormControl  sx={{ m: 1, minWidth: 200}}>
            <InputLabel id="demo-multiple-chip-label">Equipamiento</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={exerciseEquipmentsSearchUS}
              onChange={handleChangeEquipamiento}
              input={<OutlinedInput id="select-multiple-chip" label="Equipamiento"/>}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip 
                      key={value} 
                     label={exerciseAtributsUS.exerciseEquipments.map((equipment)=>{
                          if(equipment._id===value) return equipment.exerciseEquipment
                    }) } 
                  /> 
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {exerciseAtributsUS.exerciseEquipments.map((equipment) => (
                <MenuItem
                  key={equipment._id}
                  value={equipment._id}
                  style={getStylesItemSelector(
                    equipment._id,
                    exerciseEquipmentsSearchUS,
                    theme
                  )}
                >
                  {equipment.exerciseEquipment}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          </div>

{/* ///////////////////// TABLA  ///////////////////// */}          
        <div style={{color: 'blue', border:'solid'}}>
          Tabla
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> Nombre Ejercicio</TableCell>
                  <TableCell align="center">Tipo de Ejercicio</TableCell>
                  <TableCell align="center">Dificultad</TableCell>
                  <TableCell align="center">Partes del Cuerpo</TableCell>
                  <TableCell align="center">Musculos Involucrados</TableCell>
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
                {excerciseListUS.map((excercise) =>{
                  if(excercise.show===undefined){
                    return drawTableRows(excercise)
                  }
                  else if(excercise.show===true){
                    return drawTableRows(excercise)
                  }
                })}
              </TableBody>
              
            </Table>
          </TableContainer> 
        </div> 
      </div>
    )
  }
  else {
    return <h1>CARGANDO</h1>;
  }

  
  

    
}

export default ListExercises;