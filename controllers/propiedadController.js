import { Precios, Categorias, Usuarios, Propiedades } from "../models/index.js";
import { validationResult } from "express-validator";

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
    Categorias.findAll(),
    Precios.findAll(),
  ]);

  res.render("propiedades/crear", {
    tituloPagina: "Crear una nueva propiedad",
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    headerAdmin: true,
    datos: {},
  });
};

const guardar = async (req, res) => {
  // Validación
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    // Consultar el modelo de Precio y Categorias
    const [categorias, precios] = await Promise.all([
      Categorias.findAll(),
      Precios.findAll(),
    ]);

    // Errores
    return res.render("propiedades/crear", {
      tituloPagina: "Crear una Propiedad",
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body,
    });
  }

  // Crear registro
  const {
    titulo,
    descripcion,
    habitaciones,
    parqueaderos,
    wc,
    calle,
    lat,
    lng,
    precio: precioId,
    categoria: categoriaId,
  } = req.body;

  try {
    const propiedadGuardada = await Propiedades.create({
      titulo,
      descripcion,
      habitaciones,
      parqueaderos,
      wc,
      calle,
      lat,
      lng,
      precioId,
      categoriaId,
      imagen: "",
    });
    console.log("Informacion guardada" + propiedadGuardada);
  } catch (error) {
    console.log(error);
  }
};

export { admin, crear, guardar };
