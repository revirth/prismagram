require("dotenv-expand")(require("dotenv").config());

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);

  return `${adjectives[randomNumber]}-${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = emailTo => {
  const email = {
    from: "admin@prismagram.com",
    to: emailTo,
    subject: "Login Secret for Prismagram :)",
    html: `Hello! login secret is <b>${generateSecret()}</b>  <br />Copy paste on the app to log in`
  };

  sendMail(email);
};
