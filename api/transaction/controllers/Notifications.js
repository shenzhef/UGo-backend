"use strict";
const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken(
  "TEST-2673649138924674-062117-027521d8ee3db857ed96256a55e4dd4f-102188289"
);

module.exports = {
  async find(ctx) {
    console.log("aca", ctx.request.body);

    return ctx.send("Email enviado!");
  },
};
