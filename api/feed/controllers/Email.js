"use strict";

module.exports = {
  async index(ctx) {
    console.log("entra");
    await strapi.plugins["email"].services.email.send({
      to: "martin.miauro@gmail.com",
      from: "martin.miauro@gmail.com",
      replyTo: "no-reply@example.com",
      subject: "Use strapi email provider successfully",
      templateId: "d-f0c3bb03e9ac46708396083f1bb7c84d",
    });
    return ctx.send("Email enviado!");
  },
};
