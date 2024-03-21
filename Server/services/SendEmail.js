import nodemailer from "nodemailer";
import { USER, PASSWORD, LINK_URL } from "../config";
import { Link } from "../models";

async function mail(link_token, email) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: USER,
        pass: PASSWORD,
      },
    });

    const link = await Link.create({
      link_token: link_token,
      invalid: false,
    });

    const url = `${LINK_URL}/reset/${link.link_token}`;
    await transporter.sendMail({
      from: USER,
      to: email,
      subject: "Login",
      text: "Hello User",
      html: `<div style='color:#000'><p>Hi there,</p><p>Please click the link below to login to TweetChat.</p><a href=${url} style='color:#000'>LOGIN</a><p>Many thanks,<br>The TweetChat team.</p></div>`,
    });
  } catch (error) {
    console.error;
  }
}

export default mail;