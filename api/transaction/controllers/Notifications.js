"use strict";
const mercadopago = require("mercadopago");
const { sanitizeEntity } = require("strapi-utils");
const {
  send_notification,
} = require("../../../extensions/users-permissions/controllers/User");
//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken(
  "TEST-7917744806992209-032021-ae7dd7888dc62c96df4bbdac4fa12d19-227590603"
);

module.exports = {
  async webhook(ctx) {
    // console.log("aca", ctx.query);

    let entity;
    let paseo;
    let responseMP;
    let somePushTokens = ctx.request.body.expo;
    console.log("expo", somePushTokens);
    // const tickets = await send_notification(somePushTokens);
    if (ctx.query["data.id"] !== "null" && ctx.query.type == "payment") {
      responseMP = mercadopago.payment
        .get(ctx.query["data.id"])
        .then(async (pago) => {
          // console.log(pago.body);
          try {
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
            if (entity._id) {
              try {
                paseo = await strapi.query("feed").model.update(
                  {
                    bundleID: pago.body.metadata.bundle_id,
                  },
                  {
                    transaction: entity._id,
                  },
                  {
                    multi: true,
                  }
                );
                console.log("paseo", paseo);
              } catch (error) {
                console.log(error);
                return { error: error };
              }

              return {
                entity: entity,
                paseo: paseo,
              };
            } else {
              return { error: "error" };
            }
          } catch (error) {
            return { error: error };
          }
        })
        .catch((e) => {
          console.log("error", e);
          return { error: e };
          // response.redirect(request.query.linking_url);
        });
    } else {
      return { error: true };
      // response.redirect(request.query.linking_url);
    }
    // console.log("responseMP", responseMP);
    return responseMP;
    ctx.send({ expo: tickets });
    // return sanitizeEntity(entity, { model: strapi.models.transaction });
  },
};
