const nodemailer = require("nodemailer");
const sendMailToResetPassword = async(link, receiver) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SUPPORT_EMAIL,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  const mailOptions = {
    from: "mrcat5658@gmail.com", // sender address
    to: receiver, // list of receivers
    subject: "Reset password - SocialVista", // Subject line
    text: "Click the button below to reset your password", // Plain text body
    html: `
            <div style="text-align: center;">
                <h2>Reset Your Password</h2>
                <p>Click the button below to reset your password:</p>
                <a href="${link}" style="text-decoration: none;">
                    <button style="
                        background-color: #772ba9;
                        border: none;
                        color: white;
                        padding: 15px 32px;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                        border-radius: 4px;
                    ">Reset Password</button>
                </a>
            </div>
        `,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
} catch (error) {
    console.error("Error sending email:", error);
    return false;
}
};

module.exports = sendMailToResetPassword;
