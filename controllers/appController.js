import { Sequelize } from "sequelize";
import { Precios, Categorias, Usuarios, Propiedades } from "../models/index.js";

const inicio = async (req, res) => {
  const [categorias, precios, casas, departamentos] = await Promise.all([
    Categorias.findAll({ raw: true }),
    Precios.findAll({ raw: true }),
    Propiedades.findAll({
      limit: 3,
      where: {
        categoriaId: 1,
      },
      include: [
        {
          model: Precios,
          as: "precio",
        },
      ],
      order: [["createdAt", "DESC"]],
    }),
    Propiedades.findAll({
      limit: 3,
      where: {
        categoriaId: 2,
      },
      include: [
        {
          model: Precios,
          as: "precio",
        },
      ],
      order: [["createdAt", "DESC"]],
    }),
  ]);

  res.render("inicio", {
    pagina: "Inicio",
    categorias,
    precios,
    casas,
    departamentos,
    csrfToken: req.csrfToken(),
  });
};

export { inicio };
