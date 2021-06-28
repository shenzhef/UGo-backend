"use strict";

module.exports = {
  async index(ctx) {
    console.log("entra");
    await strapi.plugins["email"].services.email.send({
      to: "martin.miauro@gmail.com",
      from: "martin.miauro@gmail.com",
      subject: "Use strapi email provider successfully",
      text: "Hello world!",
      html: "Hello world!",
    });
    return ctx.send("Email enviado!");
  },
};
