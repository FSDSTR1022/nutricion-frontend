import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { fontSize } from "@mui/system";

function valuetext(value) {
  return `${value}kcal`;
}

export default function RangeSlider() {
  const [value, setValue] = useState([0, 500]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ marginLeft: "50 px" }}>
      <Box sx={{ width: 300 }}>
        <Typography
          id='input-slider'
          sx={{
            textAlign: "center",
            marginBottom: "50 px",
            fontSize: 20,
            fontStyle: " bold",
          }}
          gutterBottom
        >
          Rango kcal
        </Typography>
        <Slider
          getAriaLabel={() => "kcal Range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay='on'
          getAriaValueText={valuetext}
          max={600}
        />
      </Box>
    </div>
  );
}
