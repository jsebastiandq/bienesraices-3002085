import { Precios, Categorias, Usuarios, Propiedades } from "../models/index.js";
import { validationResult } from "express-validator";

const admin = async (req, res) => {
  // Leer QueryString
  const { pagina: paginaActual } = req.query;

  const expresion = /^[1-9]$/;

  if (!expresion.test(paginaActual)) {
    return res.redirect("/mis-propiedades?pagina=1");
  }

  try {
    const { id } = req.usuario;

    // Limites y Offset para el paginador
    const limit = 10;
    const offset = paginaActual * limit - limit;

    const [propiedades, total] = await Promise.all([
      Propiedades.findAll({
        limit,
        offset,
        where: {
          usuarioId: id,
        },
        include: [
          { model: Categorias, as: "categoria" },
          { model: Precios, as: "precio" },
        ],
      }),
      Propiedades.count({
        where: {
          usuarioId: id,
        },
      }),
    ]);

    res.render("propiedades/admin", {
      pagina: "Mis Propiedades",
      propiedades,
      csrfToken: req.csrfToken(),
      paginas: Math.ceil(total / limit),
      paginaActual: Number(paginaActual),
      total,
      offset,
      limit,
    });
  } catch (error) {
    console.log(error);
  }
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

  const { id: usuarioId } = req.usuario;

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
      usuarioId,
      imagen: "",
    });

    const { id } = propiedadGuardada;

    res.redirect(`/propiedades/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const agregarImagen = async (req, res) => {
  const { id } = req.params;
  // Validar que la propiedad exista
  const propiedad = await Propiedades.findByPk(id);
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Validar si esta publicada
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }

  //Validar que la propiedad sea del usuario
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  res.render("propiedades/agregar-imagen", {
    tituloPagina: "Agregar una imagen",
    csrfToken: req.csrfToken(),
    propiedad,
  });
};

const almacenarImagen = async (req, res, next) => {
  const { id } = req.params;
  // Validar que la propiedad exista
  const propiedad = await Propiedades.findByPk(id);
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Validar si esta publicada
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }

  //Validar que la propiedad sea del usuario
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  try {
    //Almacenar en la DB
    propiedad.imagen = req.file.filename;
    propiedad.publicado = 1;

    await propiedad.save();

    next();
  } catch (error) {
    console.log(error);
  }
};

export { admin, crear, guardar, agregarImagen, almacenarImagen };
