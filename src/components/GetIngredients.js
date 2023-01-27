import React from "react";
import { useEffect } from "react";

const GetIngredients = ({ setLista }) => {
  useEffect(() => {
    fetch("http://localhost:3000/ingredients/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.ingredients);
        setLista(data.ingredients);
      })
      .catch((err) => console.log("error", err));
  }, []);
};

export default GetIngredients;
