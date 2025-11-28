import express from "express";
import { inicio } from "../controllers/appController.js";

const router = express.Router();

// Página de Inicio
router.get("/", inicio);

export default router;
