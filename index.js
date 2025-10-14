import express from "express";
import usuarioRoutes from "./routes/usuariosRoutes.js";

// Crear APP
const app = express();

// Habilitar Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Routing
app.use("/auth", usuarioRoutes);

// Definir el puerto
const port = 3000;

app.listen(port, () => {
  console.log("El servidor esta corriendo en el puerto: " + port);
});
