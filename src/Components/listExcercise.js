/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import FormExcercise from "./formExercise";
import { getExcercise, getExcerciseAtribut,deleteExcercise} from "../services/excerciseService";
import { useEffect, useState } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@mui/material/styles";
import {useNavigate,useLocation,useParams} from "react-router-dom"
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
  Paper,
  ImageList,
 ImageListItem,
 Button,
 Alert,
  Snackbar,
  Dialog,
         DialogContent,
         DialogTitle,
         DialogActions,
         DialogContentText,
         FormControlLabel,
         Checkbox
} from '@mui/material';


const ExercisesList = (props) =>{
  const [isLoadingExercise, setIsLoadingExcersice] = useState(true);
  const [isLoadingExerciseAtributes, setIsLoadingExcersiceAtributes] = useState(true);
  const [excerciseListUS,setExcerciseListUS] = useState();
  const [exerciseAtributsUS, setExerciseAtributesUS] = useState([]);
  const [exerciseBodyPartsSearchUS, setExcersiseBodyPartsSearchUS] = useState([]);
  const [exerciseTypeSearchUS, setExerciseTypeSearchUS] = useState("");
  const [exerciseDifficulSearchtUS, setExerciseDifficulSearchUS] = useState("");
  const [exerciseMuclesSearchUS, setExerciseMuclesSearchUS] = useState([]);
  const [exerciseEquipmentsSearchUS, setExerciseEquipmentsSearchUS] = useState([]);
  const [exerciseNameSeachUS, setExerciseNameSearchUS] = useState("");

    
  const [openConfirmationUS, setOpenConfirmationUS] = useState(false); /* para el dialogo de confirmación de eliminar ejercicio */

  const [openFormDialogUS, setOpenFormDialogUS] = useState(false); /* para abrir el dialog del formulario de ejercicios */
  const [actionToDoInExcerciseDialog,setActionToDoInExcerciseDialog] = useState() /* para saber que accion se realiza con el formulario de ejercicio */
  const [exerciseToDeleteOrEdit, setExerciseToDeleteOrEdit] = useState(""); /* para pasar el ejercicio al formulario de ejercicio */
  const [resultActinDialog,setResultActinDialog]= useState(); /* para saber el resultado del formulario de ejercicio */

  const [openAlertUS, setOpenAlertUS] = useState(false);
  const [messageAlertUS, setMessageAlertUS] = useState("")
  const [severityAlertUS,setSeverityAlertUS]= useState("")
  
  
  const [actionUS, setActionUS] = useState({})/*  para saber la accion que se va a realizar con el listado */

/*   const [excerciseListToAddRoutineUS, setExcerciseListToAddRoutineUS] = useState([]) */
  
 /* const [excerciseRepSegUS, setExcerciseRepSegUS] = useState([]);  para el campo repeticines/tiempo */

  /* const [excercisesSelectUS, setExcercisesSelectUS] = useState(false);  -> para saber los ejercicios selesccionados con los checks */

  const [renderUS, setRenderizadoUS] = useState(false);

  const {action,excercisesToAdd,setExcerciseToAdd} = props; 

  
  const navigate = useNavigate();

  
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
		if (action === undefined) {
			setActionUS('listExcercise');
		} else {
			setActionUS(action);
		}

		switch (action) {
			case 'listExcercise':
				console.log('listExcercise');
				break;
			case 'selectExcercise':
				console.log('selectExcercise');
				break;
      default:
				break;
		}

		getExcerciseAtribut().then(data => {
			setExerciseAtributesUS(data);
			setIsLoadingExcersiceAtributes(false);
		});

		getExcercise().then(data => {
			setExcerciseListUS(data);
			setIsLoadingExcersice(false);
		});

		if (resultActinDialog === 'saveSuccessfully') {
			setOpenAlertUS(true);
			setMessageAlertUS('Se guardo el ejercicio correctamente');
			setSeverityAlertUS('success');
		} else if (resultActinDialog === 'modifiedSuccessfully') {
			setOpenAlertUS(true);
			setMessageAlertUS('Se modifico el ejercicio correctamente');
			setSeverityAlertUS('success');
		}
	}, [resultActinDialog]);

  useEffect(() => { 
  }, [renderUS]);

  
  
  const handleClickNewExcerciseDialogButton=(event)=>{
    setActionToDoInExcerciseDialog("newExercise")
    setOpenFormDialogUS(true)
  }

  const handleClickView = (evento)=>{
    const excersiceToView= excerciseListUS.find((element)=>{
      return element._id===evento
    })
     
    /* navigate("/Ejercicios/Ejercicio",
      {state:{action:"editExercise",excercise:e}
    }   
    ) */

    setActionToDoInExcerciseDialog("viewExercise")
    setExerciseToDeleteOrEdit(excersiceToView)
    setOpenFormDialogUS(true)
  }
    
  const handleClickEditExcercise = (evento)=>{
 
    const excersiceToEdit= excerciseListUS.find((element)=>{
      return element._id===evento
    })
    
    /*  navigate("/Ejercicios/Ejercicio",
      {state:{action:"editExercise",excercise:excersiceToEdit}
    }   
    )  */

   
    setActionToDoInExcerciseDialog("editExercise")
    setExerciseToDeleteOrEdit(excersiceToEdit)
    setOpenFormDialogUS(true)
    
  }

  const handleClickDelteExcercise = (evento)=>{

    const excersiceToDelete= excerciseListUS.find((excercise)=>{
      return excercise._id===evento
    })

    setExerciseToDeleteOrEdit(excersiceToDelete);
    setOpenConfirmationUS(true); 
 
  }

  const handleClickAceptDelteExcercise = (event) =>{

   if(event.target.value==="aceptar")
    {
            
        deleteExcercise(exerciseToDeleteOrEdit).then((response) =>{

            if(response.status===200){
              setMessageAlertUS("Se elimino el ejercicio")
              setSeverityAlertUS("success") /* "success":"error" */
              setOpenAlertUS(true)
            }
            else{
              setMessageAlertUS("No se pudo eliminar el ejercicio")
              setSeverityAlertUS("success") /* "success":"error" */
              setOpenAlertUS(true)
            }
      }).catch((error) => {
            setMessageAlertUS("No se pudo eliminar el ejercicio"+error)
            setSeverityAlertUS("error") /* "success":"error" */
            setOpenAlertUS(true)
      });

      setOpenConfirmationUS(false);
      
      // eslint-disable-next-line no-useless-return
      return  
    }
    else if(event.target.value==="cancelar")
    {
      setOpenConfirmationUS(false);
      setExerciseToDeleteOrEdit()
      // eslint-disable-next-line no-useless-return
      return      
    } 

  }

  const handleChangeExerciseNameInput = (event) => {
    
    setExerciseNameSearchUS(event.target.value);

    if(event.target.value==="")
    {
      // eslint-disable-next-line no-useless-return, array-callback-return
      excerciseListUS.map((excercise)=>{
        excercise.show = true;
      })
    }
    else{
      // eslint-disable-next-line no-useless-return, array-callback-return
      excerciseListUS.map((excercise)=>{
        if(excercise.name.includes(event.target.value)){
          excercise.show = true;
        }
        else{
          excercise.show = false;
        }        
      })
    }
  };

  const handleChangeExerciseTypeSearch = (event) => {
    setExerciseTypeSearchUS(event.target.value)

    if(event.target.value==="quitarSeleccion")
    {
      // eslint-disable-next-line array-callback-return
      excerciseListUS.map((excercise)=>{
        excercise.show = true;
      })

      setExerciseTypeSearchUS("");
      
    }
    else{
      // eslint-disable-next-line array-callback-return
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
      // eslint-disable-next-line array-callback-return
      excerciseListUS.map((excercise)=>{
        excercise.show = true;
      })

      setExerciseDifficulSearchUS("");
      
    }
    else{
      // eslint-disable-next-line array-callback-return
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
      return valor==="quitarSeleccion" 
    })

    if(quitarSeleccion || event.target.value.length===0)
    {
      // eslint-disable-next-line array-callback-return
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

        // eslint-disable-next-line array-callback-return
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
   
   const quitarSeleccion=event.target.value.some((valor)=>{
    return valor==="quitarSeleccion" 
    })

  if(quitarSeleccion || event.target.value.length===0)
  {
    // eslint-disable-next-line array-callback-return
    excerciseListUS.map((excercise)=>{
      excercise.show = true;
      })

      setExerciseMuclesSearchUS([])     
  }      
  else{

    const {target: { value },} = event;
    setExerciseMuclesSearchUS(
        typeof value === "string" ? value.split(",") : value,
    );

      excerciseListUS.map((excercise)=>{     
        const mostrarEjercicio = excercise.muscles.some((muscle)=>{
          return event.target.value.some((valor)=>{
            return muscle.muscle===valor
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
 };

 const handleChangeEquipamiento = (event) => {
  
  const quitarSeleccion=event.target.value.some((valor)=>{
    return valor==="quitarSeleccion" 
    })

  if(quitarSeleccion || event.target.value.length===0)
  {
    excerciseListUS.map((excercise)=>{
      excercise.show = true;
      })
      
      setExerciseEquipmentsSearchUS([])     
  }      
  else{

    const {target: { value },} = event;
    setExerciseEquipmentsSearchUS(
        typeof value === "string" ? value.split(",") : value,
    );

      excerciseListUS.map((excercise)=>{     
        const mostrarEjercicio = excercise.equipments.some((equipment)=>{
          return event.target.value.some((valor)=>{
             return equipment.exerciseEquipment===valor
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
};

const handleCloseMessage = (event, reason) => {
 
  if (reason === 'clickaway') {
    setOpenAlertUS(false);
  }  
  setOpenAlertUS(false);
};

const handleClickOpenBoton = () => {
  setOpenConfirmationUS(true);
}; 

 function getStylesItemSelector(name, partesCuerpo, theme) {
  return {
    fontWeight:
      partesCuerpo.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const handleChangeSelectExcerciseCheckbox = event => {

	if (event.target.checked) {
		const excerToAdd = excerciseListUS.find(
			excersice => excersice._id === event.target.value
		);
		const arrayEjercicios = excercisesToAdd;
		arrayEjercicios.push({ excercise: excerToAdd });
		setExcerciseToAdd(arrayEjercicios);    
	} else {
		const array = excercisesToAdd;
		const arrayLimpio = array.filter(element => element.excercise._id !== event.target.value);
		setExcerciseToAdd(arrayLimpio);    
	}

  /* para que vuelva a renderizar */
  if (renderUS) {
		setRenderizadoUS(false);
	} else {
		setRenderizadoUS(true);
	}
  
};

const handleChangeExcerciseRepSegTexField = excerciseId => event => {
	
  const resultado = excercisesToAdd.find(
		element => element.excercise._id === excerciseId
	);

  resultado.timeOReps = event.target.value

  if (renderUS) {
		setRenderizadoUS(false);
	} else {
		setRenderizadoUS(true);
	}
};

const getTableHead =()=>{

  const a= <>
    <TableCell> Nombre Ejercicio</TableCell>
    <TableCell align="center">Tipo de Ejercicio</TableCell>
    <TableCell align="center">Dificultad</TableCell>
    <TableCell align="center">Partes del Cuerpo</TableCell>
    <TableCell align="center">Musculos Involucrados</TableCell>
    <TableCell align="center">Equipamiento</TableCell>
  </>

if(actionUS==="listExcercise"){
  return( 
    <TableRow>
          {a}
          <TableCell align="center">Explicación</TableCell>
          <TableCell align="center">Precauciones </TableCell>
          <TableCell align="center">Demostración</TableCell>
          <TableCell align="center">Ver</TableCell>
          <TableCell align="center">Modificar</TableCell>
          <TableCell align="center">Eliminar</TableCell>
      </TableRow>
  )
}
else if(actionUS==="selectExcercise"){
  return(
    <TableRow>
      {a}
      <TableCell align="center">Seleccionar</TableCell>
      <TableCell align="center">Repeticiones/Tiempo </TableCell>
      {/* <TableCell align="center">Equipamiento</TableCell>
      <TableCell align="center">Peso</TableCell> */}
    </TableRow>

  )
}
}

const drawTableRows = (excercise)=>{
  
  const cells = <>
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
   </>

if(actionUS==="listExcercise"){
  return(
    <TableRow key={excercise._id} hover={true} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      {cells}
      <TableCell align="center">{excercise.explanation}</TableCell>
        <TableCell align="center">{excercise.precautions}</TableCell>
        <TableCell align="center">{
          <ImageList sx={{ width: 250, height: 100 }} cols={2} rowHeight={100}>
            <ImageListItem key={"photo:"+excercise._id}>
                <img
                  src={excercise.photo}
                  srcSet={excercise.photo}
                  alt={"Foto"}
                  loading="Cargando..."
                />
              </ImageListItem>
              <ImageListItem key={"video:"+excercise._id}>
                <img
                  src={excercise.video}
                  srcSet={excercise.video}
                  alt={"Video"}
                  loading="Cargando..."
                />
              </ImageListItem>      
          </ImageList>
          }
        </TableCell>
        {getIconsRow(excercise)}
    </TableRow>
)
}
else if(actionUS==="selectExcercise"){
  return (
		<TableRow
			key={excercise._id}
			hover={true}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			{cells}
			{getIconsRow(excercise)}
			<TableCell align='center'>
				<FormControl sx={{ m: 1, minWidth: 50 }} value={excercise._id}>
					<TextField
						id='standard-basic'
						label='Repeticiones / tiempo'
						variant='outlined'
						disabled={
							!excercisesToAdd.some(element => {
								return element.excercise._id === excercise._id;
							})
						}
						value={devolverTimeoReps(excercise._id)}
						onChange={handleChangeExcerciseRepSegTexField(excercise._id)}
					/>
				</FormControl>
			</TableCell>
		</TableRow>
	);
}
  

}

  const getIconsRow = (excercise)=>{

    if(actionUS==="listExcercise")
    {
      return (
        <>
        <TableCell align="center">
          <SearchIcon onClick={() => (excerciseListUS ? handleClickView(excercise._id) : null)} />
        </TableCell><TableCell align="center">
            <EditIcon onClick={() => (excerciseListUS ? handleClickEditExcercise(excercise._id) : null)} />
          </TableCell>
        <TableCell align="center">
            <DeleteOutlinedIcon onClick={() => (excerciseListUS ? handleClickDelteExcercise(excercise._id) : null) }/>
        </TableCell> 
        </>        
      )
    }
    else if(actionUS==="selectExcercise")
    {
      return (
				<>
					<TableCell align='center'>
						<FormControlLabel
							label='Seleccionar'
							value={excercise._id}
							control={
								<Checkbox
									onChange={handleChangeSelectExcerciseCheckbox}
									checked={excercisesToAdd.some(element => {
										return element.excercise._id === excercise._id;
									})}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
							}
						/>
					</TableCell>
				</>
			);
    }
  }

const getMenuItemQuitarSeleccion = ()=>{
    return (
      <MenuItem value={"quitarSeleccion"} sx={{ color: "red"}}>
      Quitar Selección
    </MenuItem> 
    )
}

const getTitle= ()=> {
   
  switch (actionUS) {
    case "selectExcercise":
      return <h1>Seleccionar ejercicio</h1>
    case "listExcercise":
      return <h1>Listado de Ejercicios</h1>
    } 
}

const handleCloseFormExcerciseDialog = (evento) => {
  setOpenFormDialogUS(false);
  };

const getDialogContent = ()=>{
 
  switch (actionToDoInExcerciseDialog) {
    case "newExercise" :
      return <FormExcercise action={{action:"newExercise",setOpendialog:setOpenFormDialogUS,result:setResultActinDialog}}/>
     
    case "editExercise" :
     return <FormExcercise action={{action:"editExercise",excercise:exerciseToDeleteOrEdit,setOpendialog:setOpenFormDialogUS,result:setResultActinDialog}}/> 
    
     case "viewExercise" :
      return <FormExcercise action={{action:"viewExercise",excercise:exerciseToDeleteOrEdit,setOpendialog:setOpenFormDialogUS,result:setResultActinDialog}}/> 
     
    default:
      return <h1>No se puede cargar el formulario</h1>;
  }
}  

const handleClickMostrarEjercicios = ()=>{
  console.log(excercisesToAdd)
}



const devolverTimeoReps = (excerciseId)=>{
   const a = excercisesToAdd.find(element => 
    element.excercise._id === excerciseId)

   if(a===undefined){ 
    return ""
  }else{
    return a.timeOReps
    
  } 
}




if (!isLoadingExercise && !isLoadingExerciseAtributes) {
    return(
      <div>
        {getTitle()}

{/* ///////////////////// BOTON NUEVO  ///////////////////// */}
<div style={{display: "flex", justifyContent: "flex-end"}}>
  <Button variant="contained" onClick={handleClickMostrarEjercicios}>Mostar Ejercicios a agregar</Button>
  <Button variant="contained" onClick={handleClickNewExcerciseDialogButton}>Nuevo Ejercicio Dialogo</Button>
 
</div>

{/* ///////////////////// FILTROS  ///////////////////// */}
        <div>

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
                {exerciseTypeSearchUS.length !== 0 ? getMenuItemQuitarSeleccion():null}
                {exerciseAtributsUS.exerciseType.map((te, id) => (
                  <MenuItem value={te.exerciseType} key={id}>
                    {te.exerciseType}
                  </MenuItem>
                ))}
                
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
                {exerciseDifficulSearchtUS.length !== 0 ? getMenuItemQuitarSeleccion():null}
                {exerciseAtributsUS.exerciseDifficult.map((de, id) => (
                  <MenuItem value={de.exerciseDifficulty} key={id}>
                    {de.exerciseDifficulty}
                  </MenuItem>
                ))}
                 
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
              {exerciseBodyPartsSearchUS.length !== 0 ? getMenuItemQuitarSeleccion():null}
              {exerciseAtributsUS.bodyParts.map((part) => (
                <MenuItem
                  key={part._id}
                  value={part.bodyPart}
                  style={getStylesItemSelector(part.bodyPart,exerciseBodyPartsSearchUS,theme)}
                >
                  {part.bodyPart}
                </MenuItem>
              ))}
                
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
                          if(muscle.muscle===value) return muscle.muscle
                    }) } 
                  /> 
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {exerciseMuclesSearchUS.length !== 0 ? getMenuItemQuitarSeleccion():null}
              {exerciseAtributsUS.exerciseMucles.map((muscle) => (
                <MenuItem
                  key={muscle.muscle}
                  value={muscle.muscle}
                  style={getStylesItemSelector(muscle.muscle,exerciseMuclesSearchUS,theme)}
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
                          if(equipment.exerciseEquipment===value) return equipment.exerciseEquipment
                    }) } 
                  /> 
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {exerciseEquipmentsSearchUS.length !== 0 ? getMenuItemQuitarSeleccion():null}
              {exerciseAtributsUS.exerciseEquipments.map((equipment) => (
                <MenuItem
                  key={equipment._id}
                  value={equipment.exerciseEquipment}
                  style={getStylesItemSelector(
                    equipment.exerciseEquipment,
                    exerciseEquipmentsSearchUS,
                    theme
                  )}
                >
                  {equipment.exerciseEquipment}
                </MenuItem>
              ))
              }
              </Select>
          </FormControl>
        </div>

{/* ///////////////////// TABLA  ///////////////////// */}          
        <div>          
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650}} aria-label="simple table">
              <TableHead>
                {getTableHead()}
              </TableHead>
              <TableBody>
                {excerciseListUS.map((excercise) =>{
                    if(excercise.show===undefined ||excercise.show===true){
                      return drawTableRows(excercise)
                    }                  
                  })}
              </TableBody>              
            </Table>
          </TableContainer> 
        </div>

      
{/* ///////////////////// Mensaje de resultado  ///////////////////// */}              
      <div>
        <Snackbar open={openAlertUS} autoHideDuration={6000} onClose={handleCloseMessage}>
          <Alert variant="filled" onClose={handleCloseMessage} severity={severityAlertUS} sx={{ width: '100%' }}>
            {messageAlertUS}
          </Alert>
        </Snackbar>
      </div>

{/* ///////////////////// Dialogo de confirmación  ///////////////////// */}   
        <Dialog
            open={openConfirmationUS}
            onClose={handleClickDelteExcercise}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Eliminar Ejercicio"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                ¿Desea eliminar el ejercicio?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button value="aceptar" onClick={handleClickAceptDelteExcercise}>Aceptar</Button>
              <Button value="cancelar" onClick={handleClickAceptDelteExcercise}> Cancelar </Button>
            </DialogActions>
        </Dialog>

{/* ///////////////////// Dialogo nuevo ejercicio  ///////////////////// */}   
          <div>
            <Dialog
              open={openFormDialogUS}
              onClose={handleCloseFormExcerciseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              /* fullWidth="xl" */
              maxWidth="xl"
            >
              <DialogContent>
                {getDialogContent()}
              </DialogContent>
              <DialogActions>
                  <Button value="cancelar" onClick={handleCloseFormExcerciseDialog}> Cancelar </Button>
              </DialogActions>
            </Dialog> 
          </div>
    </div>
     )
  }
  else {
    return <h1>CARGANDO</h1>;
  }
    
}

export default ExercisesList;