import Categoria from "../models/Categorias.js";
import Precio from "../models/Precios.js";

const admin = (req, res) => {
  res.render("propiedades/admin", {
    tituloPagina: "Mis propiedades",
    csrfToken: req.csrfToken(),
    headerAdmin: true,
  });
};

const crear = async (req, res) => {
  // Consultar el modelo de Precio y Categorias
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);

  res.render("propiedades/crear", {
    tituloPagina: "Crear una nueva propiedad",
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    headerAdmin: true,
  });
};

export { admin, crear };
