import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  registrar,
  confirmar,
  formularioOlvidePassword,
  resetPassword,
} from "../controllers/usuariosController.js";
const router = express.Router();

// Login
router.get("/login", formularioLogin);

// Registro
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);

// Confirmar Cuenta
router.get("/confirmar/:token", confirmar);

// Olvidar Contraseña
router.get("/olvide-password", formularioOlvidePassword);
router.post("/olvide-password", resetPassword);

export default router;
