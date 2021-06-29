const forgotPasswordTemplate = require("./email-templates/forgot-password");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("PUBLIC_URL", "http://localhost:1337/"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "7dbf9c8ef079c063c02f2accf363f0ca"),
    },
    forgotPassword: {
      from: "martin.miauro@gmail.com",
      replyTo: "martin.miauro@gmail.com",
      emailTemplate: forgotPasswordTemplate,
    },
  },
});
