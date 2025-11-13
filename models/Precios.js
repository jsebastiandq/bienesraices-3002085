import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Precios = db.define("precios", {
  nombre: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
});

export default Precios;
