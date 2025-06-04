import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    },
    secure: true,
    requireTLS: true,
    port: 465
  });

  const mailOptions = {
    from: '"Terra Ripple 👋"',
    to,
    subject,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw new Error("Could not send the email");
  }

};
