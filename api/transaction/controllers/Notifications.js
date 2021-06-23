"use strict";

module.exports = {
  async find(ctx) {
    console.log("aca", ctx.request.body);
    return ctx.send("Email enviado!");
  },
};
