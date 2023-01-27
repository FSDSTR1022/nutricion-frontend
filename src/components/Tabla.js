import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { grey } from "@mui/material/colors";
import RangeSlider from "./RangeSlider";
import ButtonDelete from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";

function Tabla({
  addCard,
  lista,
  setLista,
  modCard,
  handleMouseOver,
  handleDelete,
  handleEdit,
}) {
  return (
    <React.Fragment>
      <RangeSlider />
      <TableContainer>
        <Table sx={{ maxWidth: 500 }} aria-label='simple table'>
          <TableHead sx={{ backgroundColor: "#eeeeee", color: "white" }}>
            <TableRow>
              <TableCell>Ingredients</TableCell>
              <TableCell align='center'>Kcal</TableCell>
              <TableCell align='center'>Fat&nbsp;(g)</TableCell>
              <TableCell align='center'>Carbs&nbsp;(g)</TableCell>
              <TableCell align='center'>Protein&nbsp;(g)</TableCell>
              <TableCell align='center'></TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lista.map((row) => (
              <TableRow
                hover={true}
                key={row._id}
                onMouseOver={() => (!modCard ? handleMouseOver(row._id) : null)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.nameIngredient}
                </TableCell>
                <TableCell align='right'>{row.Kcal}</TableCell>
                <TableCell align='right'>{row.grFats}</TableCell>
                <TableCell align='right'>{row.grCarboHydrates}</TableCell>
                <TableCell align='right'>{row.grProtein}</TableCell>
                <TableCell align='right'>
                  <ButtonEdit id={row._id} handleEdos={handleEdit} />
                </TableCell>
                <TableCell align='right'>
                  <ButtonDelete id={row._id} handleDdos={handleDelete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default Tabla;
