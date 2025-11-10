import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  // Enviar el correo

  await transport.sendMail({
    from: "BienesRaicesSENA.com",
    to: email,
    subject: "Confirma tu cuenta en Bienes Raices SENA",
    text: "Confirma tu cuenta en Bienes Raices SENA",
    html: `
    <p>Hola ${nombre}, comprueba tu cuenta en Bienes Raices SENA</p>
    
    <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
    <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 3000
    }/auth/confirmar/${token}">Confirmar cuenta</a> </p>

    <p>Si tu no creaste la cuenta, puedes ignorar el mensaje.</p>
    `,
  });
};

export { emailRegistro };
