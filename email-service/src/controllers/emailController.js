const emailService = require("../services/emailService");

exports.sendEmail = async (req, res) => {
  try {
    const { Email, Fname, Sname, Pno, Msg } = req.body;
    await emailService.sendMail({ Email, Fname, Sname, Pno, Msg });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
};
