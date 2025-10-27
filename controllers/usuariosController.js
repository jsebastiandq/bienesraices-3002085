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

const registrar = (req, res) => {
  console.log("Resgistrando...");
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
