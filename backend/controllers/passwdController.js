import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import User from "../models/userModel.js";
import mailgun from "mailgun-js";

const DOMAIN = "https://rahulranjanext.netlify.app/";

const mg = mailgun({ apiKey: process.env.MAILGUN_APIKEY, domain: DOMAIN });

dotenv.config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const forgotPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(400).json({
        message: "Token does not exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.token = null;

    await user.save();

    res.json({
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Please enter all fields",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.token = token;
    await user.save();

    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,

      subject: "Password Reset",
      text: `Sorry to hear you are having trouble logging into Fantasy. We got a message that you forgot your password.
      If this was you, you can get right back into your account or reset your password now.\n\n
      http://localhost:3001/forgotpassword/${token}\n\n
      If you did not request a login link or a password reset, you can ignore this message and learn more about why you may have received it.
      Only people who know your Fantasy password or click the login link in this email can log into your account.\n`,
      html: `<p>Sorry to hear you are having trouble logging into Fantasy. We got a message that you forgot your password.</p>
      <p>If this was you, you can get right back into your account or reset your password now.</p>
      <a href="http://localhost:3001/forgotpassword/${token}">

      Reset Password

      </a>
      </p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    };

    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log("Email sent");
    //     res.json({
    //       message: "Email sent",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.status(500).json({
    //       message: "Error sending email",
    //     });
    //   });

    mg.messages().send(msg, function (error, body) {
      if (error) {
        console.log(error);
        res.status(500).json({
          message: "Error sending email",
        });
      } else {
        console.log(body);
        res.json({
          message: "Email sent",
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export { resetPassword, forgotPassword };
