"use strict";

module.exports = {
  async index(ctx) {
    await strapi.plugins["email"].services.email.send({
      to: "martin.miauro@gmail.com",
      from: "paseador@ugo.com",
      subject: "Use strapi email provider successfully",
      text: "Hello world!",
      html: "Hello world!",
    });
    return ctx.send("Email enviado!");
  },
};
