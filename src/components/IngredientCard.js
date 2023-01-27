import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ListInCard from "./ListInCard";

function IngredientCard({ ingredient }) {
  return (
    <Card align='center' sx={{ maxWidth: 250 }}>
      <img
        width={200}
        height={130}
        src={"imagesh/alimentos.jpeg"}
        alt='alimentos'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {ingredient.nameIngredient}
        </Typography>
        <ListInCard ingredient={ingredient} />
        <Typography variant='body2' color='text.secondary'></Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}

export default IngredientCard;
