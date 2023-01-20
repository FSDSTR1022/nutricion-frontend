import { useEffect, useState } from "react";

import { getAtributosEjercicios } from "../services/excerciseService";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  OutlinedInput,
  Chip
} from "@mui/material";
import { useTheme } from '@mui/material/styles';

const Partidos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [atributosEjercicio, setAtributosEjercicios] = useState([]);
  const [tipoEjercicio, setTipoEjercicio] = useState("");
  const [dificultadEjercicio, setDificultdEjercicio] = useState("");
  const [partesCuerpo, setPartesCuerpo] = useState([]);

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

/*
  const URLPartidos = "http://localhost:3000/Ejercicios/NuevoEjercicio";

   useEffect(() => {
    fetch(URLPartidos)
      .then((response) => response.json())
      .then((jsonData) => {
        setAtributosEjercicios(jsonData);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);  */

  useEffect(() => {
    getAtributosEjercicios().then((data) => {
      setAtributosEjercicios(data);
      setIsLoading(false);
    });
  }, []);



  const handleChangeTipoEjercicio = (event) => {
    setTipoEjercicio(event.target.value);

    console.log("ID tipo ejercicio:", event.target.value);
  };

  const handleChangeDificultadEjercicio = (event) => {
    setDificultdEjercicio(event.target.value);

    console.log("ID dificultad:", event.target.value);
  };

  const handleChangePartesCuerpo = (event) => {
    const {
      target: { value },
    } = event;
    setPartesCuerpo(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  function getStylesPartesCuerpo(name, partesCuerpo, theme2) {
    return {
      fontWeight:
      partesCuerpo.indexOf(name) === -1
          ? theme2.typography.fontWeightRegular
          : theme2.typography.fontWeightMedium,
    };
  }

  if (!isLoading) {
    return (
      <div>
        <form>
          <h1>Nuevo Ejercicio</h1>
          {console.log("Hola", atributosEjercicio)}

          <TextField
            id="standard-basic"
            label="Nombre Ejercicio"
            variant="outlined"
          />

          <Box sx={{ minWidth: 120 }}> {/* Selectot Tipo Ejercicio */}
            <FormControl fullWidth>
              <InputLabel id="tipoEjercicioSelectLabel">
                {" "}
                Tipo de Ejercicio{" "}
              </InputLabel>
              <Select
                labelId="tipoEjercicioSelectLabel"
                id="tipoEjercicioSelect"
                value={tipoEjercicio}
                label="Dificultad"
                onChange={handleChangeTipoEjercicio}
              >
                {atributosEjercicio.tipoEjercicio.map((te, id) => (
                  <MenuItem value={te._id} key={id}>
                    {te.exerciseType}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 120 }}> {/* Selector Dificultad Ejercicio */}
            <FormControl fullWidth>
              <InputLabel id="dificultadEjercicioSelectLabel">
                {" "}
                Dificultad de Ejercicio{" "}
              </InputLabel>
              <Select
                labelId="dificultadEjercicioSelectLabel"
                id="dificultadEjercicioSelect"
                value={dificultadEjercicio}
                label="Dificultad Ejercicio"
                onChange={handleChangeDificultadEjercicio}
              >
                {atributosEjercicio.dificultad.map((de, id) => (
                  <MenuItem value={de._id} key={id}>
                    {de.exerciseDifficulty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel id="demo-multiple-chip-label">Parte del Cuerpo Involucrdas</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={partesCuerpo}
              onChange={handleChangePartesCuerpo}
              input={<OutlinedInput id="select-multiple-chip" label="Parte del Cuerpo Involucrdas" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {atributosEjercicio.parteDelCuerpo.map((parte) => (
                <MenuItem
                  key={parte.bodyPart}
                  value={parte.bodyPart}
                  style={getStylesPartesCuerpo(parte.bodyPart, partesCuerpo, theme)}
                >
                  {parte.bodyPart}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </div>
    );
  } else {
    return <h1>CARGANDO</h1>;
  }
};

export default Partidos;
