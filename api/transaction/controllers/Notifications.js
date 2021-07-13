"use strict";
const mercadopago = require("mercadopago");

//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken(
  "TEST-2673649138924674-062117-027521d8ee3db857ed96256a55e4dd4f-102188289"
);
module.exports = {
  async webhook(ctx) {
    console.log("aca", ctx.query);

    if (ctx.query["data.id"] !== "null" && ctx.query.type == "payment") {
      mercadopago.payment
        .get(ctx.query["data.id"])
        .then((pago) => {
          console.log(pago.body);

          // entity = await strapi.services.transaction.create({
          //   payment_id: ctx.query.id,
          //   status: request.query.status,
          //   total_amount: pago.body.transaction_amount,
          //   paseador: pago.body.metadata.paseador_id,
          //   user: pago.body.metadata.user_id,
          //   bundleID: pago.body.metadata.bundle_id,
          // });

          // return sanitizeEntity(entity, { model: strapi.models.restaurant });
          // },
        })
        .catch((e) => {
          console.log("error", e);
          response.redirect(request.query.linking_url);
        });
    } else {
      response.redirect(request.query.linking_url);
    }
    return ctx.send(ctx.query);
  },
};
