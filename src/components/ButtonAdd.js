import React from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const ButtonAdd = ({ handleAdd }) => {
  return (
    <Fab color='primary' aria-label='add'>
      <AddIcon onClick={handleAdd} />
    </Fab>
  );
};

export default ButtonAdd;
