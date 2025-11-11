import express from "express";
import { admin } from "../controllers/propiedadController.js";

const router = express.Router();

// Mis propidades
router.get("/mis-propiedades", admin);

export default router;
