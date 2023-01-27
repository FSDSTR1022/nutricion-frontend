import React from "react";
import axios from "axios";
import Tabla from "./components/Tabla";
import Grid from "@mui/material/Grid";
import FormPost from "./components/FormPost";
import GetIngredients from "./components/GetIngredients";
import { useState, useEffect } from "react";
import ButtonAdd from "./components/ButtonAdd";
import IngredientCard from "./components/IngredientCard";
import ReplyAllSharpIcon from "@mui/icons-material/ReplyAllSharp";

function App() {
  const [renderIngredientCard, setRenderIngredientCard] = useState(false);
  const [ingredient, setIngredient] = useState({});
  const [lista, setLista] = useState([]);
  const [modCard, setModCard] = useState(false);
  const [addCard, setAddCard] = useState(false);

  const ingredientUrl = axios.create({
    baseURL: "http://localhost:3000/ingredients/",
  });

  const handleMouseOver = (id) => {
    const index = lista.findIndex((e) => e._id === id);
    setRenderIngredientCard(true);
    setIngredient(lista[index]);
  };

  const handleDelete = (id) => {
    ingredientUrl.delete(`${id}`);
    setLista(lista.filter((e) => e._id !== id));
  };

  const formIngredientSubmit = (ingredientToPost, lista) => {
    if (!modCard) {
      ingredientUrl.post("/", ingredientToPost);
      setAddCard(!addCard);
      setLista(lista.push(ingredientToPost));
    } else {
      ingredientUrl.put("/", { ingredientToPost });
      setLista(lista.push(ingredientToPost));
    }
  };

  const handleEdit = (id, ingredient) => {
    setModCard(!modCard);
  };

  const handleAdd = () => {
    setAddCard(!addCard);
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        {!addCard ? (
          <Tabla
            addCard={addCard}
            modCard={modCard}
            handleMouseOver={handleMouseOver}
            setIngredient={setIngredient}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            lista={lista}
            setLista={setLista}
          ></Tabla>
        ) : null}
      </Grid>
      {!modCard && !addCard ? (
        <Grid item xs={3}>
          <GetIngredients lista={lista} setLista={setLista} />
          <IngredientCard
            ingredient={ingredient}
            sx={{ display: "flex", justifycontent: "center" }}
          />
          <ButtonAdd handleAdd={handleAdd} />
        </Grid>
      ) : (
        <Grid item xs={3}>
          <GetIngredients lista={lista} setLista={setLista} />
          <FormPost
            ingredient={ingredient}
            modCard={modCard}
            addCard={addCard}
            formIngredientSubmit={formIngredientSubmit}
          />
          <ReplyAllSharpIcon
            onClick={() => {
              setAddCard(false);
              setModCard(false);
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default App;
