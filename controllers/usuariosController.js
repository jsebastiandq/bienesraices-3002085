import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { generarId } from "../helpers/tokens.js";
import Usuario from "../models/Usuarios.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    tituloPagina: "Inicio de Sesión",
  });
};

const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    tituloPagina: "Registro de Usuario",
  });
};

const registrar = async (req, res) => {
  // Validaciones
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .run(req);

  await check("email")
    .isEmail()
    .withMessage("Esto no parece un correo")
    .run(req);

  await check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe ser al menos de 6 caracteres")
    .run(req);

  await check("repeat_password")
    .equals(req.body.password)
    .withMessage("La contraseña no es igual")
    .run(req);

  let resultado = validationResult(req);

  // Verificar que el resultado este vacio
  if (!resultado.isEmpty()) {
    // Errores
    return res.render("auth/registro", {
      tituloPagina: "Registro de Usuario",
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  // Extraer los datos
  const { nombre, email, password } = req.body;

  // Validar que el usuario no exista
  const existeUsuario = await Usuario.findOne({
    where: { email },
  });
  if (existeUsuario) {
    return res.render("auth/registro", {
      tituloPagina: "Registro de Usuario",
      errores: [{ msg: "El usuario ya existe" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  const usuarios = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });

  // Mostrar mensaje de Confirmación
  res.render("templates/mensaje", {
    tituloPagina: "Cuenta Creada",
    mensaje: "Se ha enviado un correo de confirmación, Da clic en el enlace.",
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    tituloPagina: "Olvide Contraseña",
  });
};

export {
  formularioLogin,
  formularioRegistro,
  registrar,
  formularioOlvidePassword,
};
