import * as React from 'react';
import { getExcercise, getExcerciseAtribut,deleteExcercise} from "../services/excerciseService";
import { useEffect, useState } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@mui/material/styles";
import {useNavigate,useLocation} from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';
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
  IconButton,
  Dialog,
         DialogContent,
         DialogTitle,
         DialogActions,
         DialogContentText
} from '@mui/material';


const ExercisesList = () =>{
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

  const [exerciseToDelete, setExerciseToDelete] = useState("");

  const [mensajeAMostrar, setMensajeAMostrar] = useState("")
  const [tipoMensajeAMostrar, setTipoMensajeAMostrar] = useState("")
  
  const [openMessage, setOpenMessage] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  
  const navigate = useNavigate();
  const {state} = useLocation(); // hook para la navegacion

    
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

 /* 
https://images.unsplash.com/photo-1516802273409-68526ee1bdd6
https://images.unsplash.com/photo-1589118949245-7d38baf380d6 
https://lh5.googleusercontent.com/LM0t4lybG4VsUyKDbDizCDZEA6y2ZeRBIqRw4RMFM8-ggC5cFhphukFT-h24CWqwycbNcvVutbJeGlueYS4zwVmBzJVyiaz-QHbRCufuJJKe8_5SEVROgxGAKk9YlzyGlxBFX-Uyl0CIxObBSXxvow
*/

  useEffect(() => {
    
    if(state!==null && mensajeAMostrar===""){
      
      switch (state.typeMessage) {
        case "guardoConExito":
          setMensajeAMostrar("Se guardo correctamente el ejercicio")
          setTipoMensajeAMostrar("success") //"success":"error"
          break;
        case "modificadoConExito":
          setMensajeAMostrar("Se modifico correctamente el ejercicio")
          setTipoMensajeAMostrar("success") //"success":"error" 
          break
      }
      
      setOpenMessage(true)
    }
        
      getExcerciseAtribut().then((data) => {
      setExerciseAtributesUS(data);
      setIsLoadingExcersiceAtributes(false);
    });

    getExcercise().then((data) => {
      setExcerciseListUS(data);
      setIsLoadingExcersice(false);
    });    
  }, [openMessage]);

  const handleClickNewExcerciseButton=(event)=>{
    navigate("/Ejercicios/Ejercicio",
      {state:
        {
          action:"newExercise"
        }
      }
    )
  }

  const handleClickView = (evento)=>{
    let e= excerciseListUS.find((element)=>{
      return element._id===evento
    })
     
    navigate("/Ejercicios/Ejercicio",
      {state:{action:"editExercise",excercise:e}
    }   
    )
  }
    
  const handleClickEditExcercise = (evento)=>{
 
    let excersiceToEdit= excerciseListUS.find((element)=>{
      return element._id===evento
    })
    
     navigate("/Ejercicios/Ejercicio",
      {state:{action:"editExercise",excercise:excersiceToEdit}
    }   
    ) 
  }

  const handleClickDelteExcercise = (evento)=>{

    let excersiceToDelete= excerciseListUS.find((excercise)=>{
      return excercise._id===evento
    })

    setExerciseToDelete(excersiceToDelete);
    setOpenConfirmation(true); 
 
  }

  const handleClickAceptDelteExcercise = (event) =>{

   if(event.target.value==="aceptar")
    {
            
        deleteExcercise(exerciseToDelete).then((response) =>{

            if(response.status===200){
              setMensajeAMostrar("Se elimino el ejercicio")
              setTipoMensajeAMostrar("success") //"success":"error"
              setOpenMessage(true)
            }
            else{
              setMensajeAMostrar("No se pudo eliminar el ejercicio")
              setTipoMensajeAMostrar("success") //"success":"error"
              setOpenMessage(true)
            }
      }).catch((error) => {
            setMensajeAMostrar("No se pudo eliminar el ejercicio"+error)
            setTipoMensajeAMostrar("error") //"success":"error"
            setOpenMessage(true)
      });

      setOpenConfirmation(false);
      return  
    }
    else if(event.target.value==="cancelar")
    {
      setOpenConfirmation(false);
      setExerciseToDelete()
      return      
    } 

  }

  const handleChangeExerciseNameInput = (event) => {
    
    setExerciseNameSearchUS(event.target.value);

    if(event.target.value==="")
    {
      excerciseListUS.map((excercise)=>{
        excercise.show = true;
      })
    }
    else{
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
      return valor==="quitarSeleccion" 
    })

    if(quitarSeleccion || event.target.value.length===0)
    {
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
   
   const quitarSeleccion=event.target.value.some((valor)=>{
    return valor==="quitarSeleccion" 
    })

  if(quitarSeleccion || event.target.value.length===0)
  {
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
    setOpenMessage(false);
  }  
  setOpenMessage(false);
};

const handleClickOpenBoton = () => {
  setOpenConfirmation(true);
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
    {/* <TableCell align="center">{excercise.video + excercise.photo }</TableCell> */}
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

    }</TableCell>
    <TableCell align="center">
      <SearchIcon onClick={() => (excerciseListUS ? handleClickView(excercise._id) : null)}/>
    </TableCell>
    <TableCell align="center">
      <EditIcon onClick={() => (excerciseListUS ? handleClickEditExcercise(excercise._id) : null)}/>
      </TableCell>
    <TableCell align="center">
      <DeleteOutlinedIcon onClick={() => (excerciseListUS ? handleClickDelteExcercise(excercise._id) : null) }/>
      </TableCell>               
  </TableRow>
   )
  }

const getMenuItemQuitarSeleccion = ()=>{
    return (
      <MenuItem value={"quitarSeleccion"} sx={{ color: "red"}}>
      Quitar Selección
    </MenuItem> 
    )
}

if (!isLoadingExercise && !isLoadingExerciseAtributes) {
    return(
      <div>
        <h1>Listado de ejercicios!</h1>

{/* ///////////////////// BOTON NUEVO  ///////////////////// */}
<div style={{display: "flex", justifyContent: "flex-end"}}>
  <Button variant="contained" onClick={handleClickNewExcerciseButton}>Nuevo Ejercicio</Button>

  <Button variant="outlined" onClick={handleClickOpenBoton}>
        Open alert dialog
      </Button>

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
                  if(excercise.show===undefined ||excercise.show===true){
                    return drawTableRows(excercise)
                  }                  
                })}
              </TableBody>              
            </Table>
          </TableContainer> 
        </div>

      
{/* ///////////////////// Mensaje de resultado  ///////////////////// */}              
        <Snackbar open={openMessage} autoHideDuration={6000} onClose={handleCloseMessage}>
          <Alert variant="filled" onClose={handleCloseMessage} severity={tipoMensajeAMostrar} sx={{ width: '100%' }}>
            {mensajeAMostrar}
          </Alert>
        </Snackbar>

{/* ///////////////////// Dialogo de confirmación  ///////////////////// */}   
        <Dialog
            open={openConfirmation}
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
               
      
 
      </div>
    )
  }
  else {
    return <h1>CARGANDO</h1>;
  }
    
}

export default ExercisesList;