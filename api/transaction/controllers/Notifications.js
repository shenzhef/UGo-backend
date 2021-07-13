"use strict";

module.exports = {
  async webhook(ctx) {
    console.log("aca", ctx.request.body);

    return ctx.send(ctx.request.body);
  },
};
