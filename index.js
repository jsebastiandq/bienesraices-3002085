import express from "express";
import usuarioRoutes from "./routes/usuariosRoutes.js";
import db from "./config/db.js";

// Crear APP
const app = express();


// Conexion a la DB
try {
  await db.authenticate();
  console.log("La conexion es correcta a la DB");
} catch (error) {
  console.error("No se puede conectar", error);
}

// Habilitar Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Definir la ruta Public
app.use(express.static("public"));

// Routing
app.use("/auth", usuarioRoutes);

// Definir el puerto
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("El servidor esta corriendo en el puerto: " + port);
});
