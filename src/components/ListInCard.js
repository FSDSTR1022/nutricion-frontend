import { height } from "@mui/system";
import React from "react";

function ListInCard({ ingredient }) {
  return (
    <table>
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
          {ingredient.grProtein}
          <span> g</span>
        </th>
      </tr>
      <tr>
        <th>
          <img alt='carbo' width={40} height={40} src={"imagesh/carbo.png"} />
        </th>
        <th>
          {ingredient.grCarboHydrates}
          <span> g</span>
        </th>
        <th>
          <img alt='kcal' width={50} height={50} src={"imagesh/kcal.png"} />
        </th>
        <th>
          {ingredient.Kcal}
          <span> g</span>
        </th>
      </tr>
      <tr>
        <th>
          <img alt='fats' width={40} height={40} src={"imagesh/fats.png"} />
        </th>
        <th>
          {ingredient.grFats}
          <span> g</span>
        </th>
      </tr>
    </table>
  );
}

export default ListInCard;
