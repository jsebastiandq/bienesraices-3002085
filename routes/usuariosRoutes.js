import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  registrar,
  formularioOlvidePassword,
} from "../controllers/usuariosController.js";
const router = express.Router();

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
router.get("/olvide-password", formularioOlvidePassword);

export default router;
