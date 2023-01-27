import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";

const ButtonEdit = ({ handleEdos, id }) => {
  return (
    <div>
      <IconButton aria-label='delete' color='secondary'>
        <EditIcon onClick={() => handleEdos(id)} />
      </IconButton>
    </div>
  );
};
export default ButtonEdit;
