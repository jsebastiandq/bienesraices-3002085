import express from "express";
import {
  formularioLogin,
  autenticar,
  formularioRegistro,
  registrar,
  confirmar,
  formularioOlvidePassword,
  resetPassword,
  comprobarToken,
  nuevoPassword,
} from "../controllers/usuariosController.js";
const router = express.Router();

// ## Login
router.get("/login", formularioLogin);
router.post("/login", autenticar);

// ## Registro
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);

// ## Confirmar Cuenta
router.get("/confirmar/:token", confirmar);

// ## Olvidar Contraseña
router.get("/olvide-password", formularioOlvidePassword);
router.post("/olvide-password", resetPassword);

// Validacion de Contraseñas (Olvide Password)
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

export default router;
