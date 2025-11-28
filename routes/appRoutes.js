import express from "express";
import { inicio, categoria } from "../controllers/appController.js";

const router = express.Router();

// Página de Inicio
router.get("/", inicio);

// Categorias
router.get("/categorias/:id", categoria);

export default router;
