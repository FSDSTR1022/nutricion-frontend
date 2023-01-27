import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";

const ButtonDelete = ({ handleDdos, id }) => {
  return (
    <div>
      <IconButton aria-label='delete' color='error'>
        <DeleteForeverSharpIcon onClick={() => handleDdos(id)} />
      </IconButton>
    </div>
  );
};

export default ButtonDelete;
