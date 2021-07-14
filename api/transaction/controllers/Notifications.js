"use strict";
const mercadopago = require("mercadopago");
const { sanitizeEntity } = require("strapi-utils");

//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken(
  "TEST-2673649138924674-062117-027521d8ee3db857ed96256a55e4dd4f-102188289"
);
module.exports = {
  async webhook(ctx) {
    console.log("aca", ctx.query);
    let entity;
    if (ctx.query["data.id"] !== "null" && ctx.query.type == "payment") {
      mercadopago.payment
        .get(ctx.query["data.id"])
        .then(async (pago) => {
          console.log(pago.body);

          entity = await strapi.services.transaction.create({
            payment_id: pago.body.id,
            status: pago.body.status,
            total_amount: pago.body.transaction_amount,
            paseador: pago.body.metadata.paseador_id,
            user: pago.body.metadata.user_id,
            bundleID: pago.body.metadata.bundle_id,
            date: pago.body.date_created,
            payment_type: "mp",
          });

          // return sanitizeEntity(entity, { model: strapi.models.restaurant });
          // },
        })
        .catch((e) => {
          console.log("error", e);
          // response.redirect(request.query.linking_url);
        });
    } else {
      // response.redirect(request.query.linking_url);
    }
    return sanitizeEntity(entity, { model: strapi.models.transaction });
  },
};
