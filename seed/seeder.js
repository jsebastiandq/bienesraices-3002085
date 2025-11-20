import { exit } from "node:process";
import categoria from "./categoria.js";
import precio from "./precio.js";
import usuario from "./usuario.js";
import { Categorias, Precios, Usuarios } from "../models/index.js";
import db from "../config/db.js";

const importarDatos = async () => {
  try {
    // Autenticar
    await db.authenticate();

    //Generar las columnas
    await db.sync();

    //Insertar los datos
    await Promise.all([
      Categorias.bulkCreate(categoria),
      Precios.bulkCreate(precio),
      Usuarios.bulkCreate(usuario),
    ]);

    console.log("Datos importados correctamente");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    //Opcion 1
    // await Promise.all([
    //   Categorias.destroy({ where: {} }),
    //   Precios.destroy({ where: {} }),
    // ]);

    //Opcion Recomendada
    await db.sync({ force: true });
    console.log("Eliminado correctamente!");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === "-i") {
  importarDatos();
}

if (process.argv[2] === "-e") {
  eliminarDatos();
}
