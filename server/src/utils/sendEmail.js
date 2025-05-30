import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "terraripple@gmail.com",      // ← tu dirección real
      pass: "zvvj trxq qtzf bdkn "     // ← la contraseña de aplicación de Gmail
    }
  });

  const mailOptions = {
    from: '"Terra Ripple 👋" <arakiztain21@gmail.com>',
    to,
    subject,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error al enviar el correo:", err);
    throw new Error("No se pudo enviar el correo");
  }
};
