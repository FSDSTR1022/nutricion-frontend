import React from "react";
import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";

function FormInCard({ ingredient, formIngredientSubmit, modCard, handleAdd }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const styleObj = {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    margin: "10 px",
  };

  if (modCard) {
    return (
      <form onSubmit={handleSubmit(formIngredientSubmit)}>
        <Input
          style={{ fontsize: 40, color: "black" }}
          placeholder={ingredient.nameIngredient}
          {...register("nameIngredient")}
        />
        <table>
          <tr></tr>
          <tr>
            <th>
              <img
                alt='protein'
                width={40}
                height={40}
                src={"imagesh/protein.png"}
              />
            </th>
            <th>
              <Input
                placeholder={ingredient.grProtein}
                style={styleObj}
                type={Number}
                {...register("grProtein")}
              />
              <span> g</span>
            </th>
          </tr>
          <tr>
            <th>
              <img
                alt='carbo'
                width={40}
                height={40}
                src={"imagesh/carbo.png"}
              />
            </th>
            <th>
              <Input
                placeholder={ingredient.grCarboHydrates}
                style={styleObj}
                type={Number}
                {...register("grCarboHydrates")}
              />
              <span> g</span>
            </th>
            <th>
              <img alt='kcal' width={50} height={50} src={"imagesh/kcal.png"} />
            </th>
            <th>
              <Input
                placeholder={ingredient.Kcal}
                style={styleObj}
                type={Number}
                {...register("Kcal")}
              />
            </th>
          </tr>
          <tr>
            <th>
              <img alt='fats' width={40} height={40} src={"imagesh/fats.png"} />
            </th>
            <th>
              <Input
                placeholder={ingredient.grFats}
                style={styleObj}
                type={Number}
                {...register("grFats")}
              />
              <span> g</span>
            </th>
          </tr>
        </table>
        <button style={{ margin: "10 px" }}>Add</button>
      </form>
    );
  }
  return (
    <form onSubmit={handleSubmit(formIngredientSubmit)}>
      <Input {...register("nameIngredient")} />
      <table>
        <tr></tr>
        <tr>
          <th>
            <img
              alt='protein'
              width={40}
              height={40}
              src={"imagesh/protein.png"}
            />
          </th>
          <th>
            <Input type={Number} {...register("grProtein")} />
            <span> g</span>
          </th>
        </tr>
        <tr>
          <th>
            <img alt='carbo' width={40} height={40} src={"imagesh/carbo.png"} />
          </th>
          <th>
            <Input type={Number} {...register("grCarboHydrates")} />
            <span> g</span>
          </th>
          <th>
            <img alt='kcal' width={50} height={50} src={"imagesh/kcal.png"} />
          </th>
          <th>
            <Input type={Number} {...register("Kcal")} />
          </th>
        </tr>
        <tr>
          <th>
            <img alt='fats' width={40} height={40} src={"imagesh/fats.png"} />
          </th>
          <th>
            <Input type={Number} {...register("grFats")} />
            <span> g</span>
          </th>
        </tr>
      </table>
      <button style={{ margin: "10 px" }}>Add</button>
    </form>
  );
}

export default FormInCard;
