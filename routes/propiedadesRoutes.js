import express from "express";
import { body } from "express-validator";
import {
  admin,
  crear,
  guardar,
  agregarImagen,
} from "../controllers/propiedadController.js";
import protegerRuta from "../middleware/protegerRuta.js";

const router = express.Router();

// Mis propidades
router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, crear);
router.post(
  "/propiedades/crear",
  body("titulo").notEmpty().withMessage("El Titulo del Anuncio es Obligatorio"),
  body("descripcion")
    .notEmpty()
    .withMessage("La Descripción no puede ir vacia")
    .isLength({ max: 200 })
    .withMessage("La Descripción es muy larga"),
  body("categoria").isNumeric().withMessage("Selecciona una categoría"),
  body("precio").isNumeric().withMessage("Selecciona un rango de Precios"),
  body("habitaciones")
    .isNumeric()
    .withMessage("Selecciona la Cantidad de Habitaciones"),
  body("parqueaderos")
    .isNumeric()
    .withMessage("Selecciona la Cantidad de Estacionamientos"),
  body("wc").isNumeric().withMessage("Selecciona la Cantidad de Baños"),
  body("lat").notEmpty().withMessage("Ubica la Propiedad en el Mapa"),
  protegerRuta,
  guardar
);

router.get("/propiedades/agregar-imagen/:id", protegerRuta, agregarImagen);

export default router;
