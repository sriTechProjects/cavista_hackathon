const nodemailer = require("nodemailer");

const email_sender = async (from, to, subject, text, html) => {
  try {
    if (!from || !to || !subject || !text || !html) {
      throw new Error(
        "All fields (from, to, subject, text, html) are required."
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.appEmail,
        pass: process.env.appPassword,
      },
    });

    const info = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });

    console.log("Email sent successfully:", info.messageId);
    return {
      success: true,
      message: "Email sent successfully.",
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error while sending email:", error.message);
    return {
      success: false,
      message: "Failed to send email.",
      error: error.message,
    };
  }
};

module.exports = email_sender;