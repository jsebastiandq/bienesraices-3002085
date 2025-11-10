import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { generarId } from "../helpers/tokens.js";
import Usuario from "../models/Usuarios.js";
import { emailRegistro } from "../helpers/emails.js";

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

  // Enviar el email
  emailRegistro({
    nombre: usuarios.nombre,
    email: usuarios.email,
    token: usuarios.token,
  });

  // Mostrar mensaje de Confirmación
  res.render("templates/mensaje", {
    tituloPagina: "Cuenta Creada",
    mensaje: "Se ha enviado un correo de confirmación, Da clic en el enlace.",
  });
};

// Funcion que va a confirmar el correo
const confirmar = async (req, res) => {
  const { token } = req.params;

  console.log(token);

  // Validar el token sea verdadero
  const usuario = await Usuario.findOne({ where: { token } });

  console.log(usuario);

  // Confirmar la cuenta
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      tituloPagina: "Error al crear cuenta",
      mensaje: "Hubo un error al confirmar tu cuenta, Intentalo de nuevo",
      error: true,
    });
  }

  //Validar la informacion y mandarla a la DB
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save();

  res.render("auth/confirmar-cuenta", {
    tituloPagina: "Cuenta confirmada",
    mensaje: "La cuenta se confirmó correctamente",
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
  confirmar,
  formularioOlvidePassword,
};
