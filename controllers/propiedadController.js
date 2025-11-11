const admin = (req, res) => {
  res.render("propiedades/admin", {
    tituloPagina: "Mis propiedades",
    csrfToken: req.csrfToken(),
    headerAdmin: true,
  });
};

export { admin };
