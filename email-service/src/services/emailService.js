const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

async function getAccessToken() {
  const accessToken = await oAuth2Client.getAccessToken();
  return accessToken.token;
}

exports.sendMail = async ({ Email, Fname, Sname, Pno, Msg }) => {
  const accessToken = await getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_SEND,
    subject: "New Message from Your Website",
    text: `
  You have received a new message from ${Fname} ${Sname}.
  
  Phone Number: ${Pno}
  Contact Email: ${Email}
  Message: ${Msg}

    `,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">New Message Received</h2>
        <p><strong>Name:</strong> ${Fname} ${Sname}</p>
        <p><strong>Phone Number:</strong> ${Pno}</p>
        <p><strong>Email:</strong> <a href="mailto:${Email}">${Email}</a></p>
        <p><strong>Message:</strong></p>
        <blockquote style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
          ${Msg}
        </blockquote>
      </div>
    `
  });
  
};