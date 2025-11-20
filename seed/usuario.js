import bcrypt from "bcrypt";

const usuario = [
  {
    nombre: "J. Sebastian Duque",
    email: "info@jsebastiandq.com",
    confirmado: 1,
    password: bcrypt.hashSync("123456", 10),
  },
  {
    nombre: "Tamarindo Tamayo",
    email: "info@test.com",
    confirmado: 1,
    password: bcrypt.hashSync("123456", 10),
  },
];

export default usuario;
