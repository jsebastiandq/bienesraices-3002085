import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Categorias = db.define("categorias", {
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

export default Categorias;
