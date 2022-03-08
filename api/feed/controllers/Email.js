"use strict";

module.exports = {
  async index(ctx) {
    console.log("entra");
    // ctx.redirect(`https://ugo.com.ar/success/?payment_id=500`);
    await strapi.plugins["email"].services.email.send({
      to: "martin.miauro@gmail.com",
      template_id: "d-f0c3bb03e9ac46708396083f1bb7c84d",
      dynamic_template_data: {
        name: "tincho",
      },
    });
  },
};
