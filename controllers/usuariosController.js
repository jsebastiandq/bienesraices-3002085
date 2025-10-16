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

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    tituloPagina: "Olvide Contraseña",
  });
};

export { formularioLogin, formularioRegistro, formularioOlvidePassword };
