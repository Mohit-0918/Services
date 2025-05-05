const emailService = require("../services/emailService");

exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;
    await emailService.sendMail({ to, subject, text });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
};
