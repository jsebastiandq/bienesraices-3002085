import { Precios, Categorias, Propiedades } from "../models/index.js";

const propiedades = async (req, res) => {
  const propiedades = await Propiedades.findAll({
    include: [
      { model: Precios, as: "precio" },
      { model: Categorias, as: "categoria" },
    ],
  });
  res.json(propiedades);
};

export { propiedades };
