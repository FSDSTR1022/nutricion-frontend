import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormInCard from "./FormInCard";

function FormPost({ formIngredientSubmit, ingredient, modCard }) {
  return (
    <Card align='center' sx={{ maxWidth: 250 }}>
      <CardContent>
        {!modCard ? (
          <Typography gutterBottom variant='h5' component='div'>
            New Ingredient
          </Typography>
        ) : (
          <Typography gutterBottom variant='h5' component='div'>
            Edit Ingredient
          </Typography>
        )}
        <Typography gutterBottom variant='h5' component='div'></Typography>
        <FormInCard
          ingredient={ingredient}
          modCard={modCard}
          formIngredientSubmit={formIngredientSubmit}
        />
        <Typography variant='body2' color='text.secondary'></Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}

export default FormPost;
