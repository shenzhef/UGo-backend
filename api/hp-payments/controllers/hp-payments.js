const { sanitizeEntity } = require("strapi-utils");
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});
const URL = strapi.config.server.url;

module.exports = {
  async webhook(ctx) {
    let entity;
    let responseMP;
    console.log("ctx", ctx);
    if (ctx.query["data.id"] !== "null" && ctx.query.type == "payment") {
      responseMP = mercadopago.payment
        .get(ctx.query["data.id"])
        .then(async (pago) => {
          console.log(pago.body);
          try {
            entity = await strapi.services.hp_payments.create({
              payment_id: pago.body.id,
              status: pago.body.status,
              total_amount: pago.body.transaction_amount,
              payment_type: "mp",
              owner_name: pago.body.payer.name,
              owner_surname: pago.body.payer.surname,
              owner_email: pago.body.payer.email,
              // owner_surname:
            });
            console.log("entity", entity);
            // if (entity._id) {
            //   try {
            //     paseo = await strapi.query("reserves-hp").model.update(
            //       {
            //         bundleID: pago.body.metadata.bundle_id,
            //       },
            //       {
            //         transaction: entity._id,
            //       },
            //       {
            //         multi: true,
            //       }
            //     );
            //     console.log("paseo", paseo);
            //   } catch (error) {
            //     console.log(error);
            //     return { error: error };
            //   }

            //   return {
            //     entity: entity,
            //     paseo: paseo,
            //   };
            // } else {
            //   return { error: "error" };
            // }
          } catch (error) {
            return { error: error };
          }
        })
        // })
        .catch((e) => {
          console.log("error", e);
          return { error: e };
          //     });
          // } else {
          //   return { error: true };
        });
    }
    // return responseMP;
  },
  async backmp(ctx) {
    // console.log("entra?");
    console.log(ctx.query);

    let mercadoPagoresponse;
    if (ctx.query.payment_id !== "null") {
      mercadoPagoresponse = await mercadopago.payment.get(ctx.query.payment_id);
      ctx.redirect(
        `https://ugo.com.ar/success/?payment_id=${ctx.query.payment_id}
        &status=${ctx.query.status}&total_amount=${mercadoPagoresponse.body.transaction_amount}&linking_url=${mercadoPagoresponse.body.metadata.linking_url}`
      );
    }
  },
  async createpreference(ctx) {
    const { body } = ctx.request;
    //process.env
    let preference = {
      items: [
        {
          title: body.title,
          description: body.description,
          unit_price: Number(body.price),
          quantity: Number(body.quantity),
          currency_id: "ARS",
        },
      ],
      statement_descriptor: "UGo Argentina",
      back_urls: {
        success: URL + "/hp-payments/backmp",
        failure: URL + "/hp-payments/backmp",
        pending: URL + "/hp-payments/backmp",
      },
      payment_methods: {
        installments: 1,
      },
      payer: {
        name: body.owner_name,
        email: body.owner_email,
        surname: body.owner_surname,
      },
      notification_url: URL + "/hp-payments/notification",

      // auto_return: "approved",
    };
    const result = mercadopago.preferences
      .create(preference)
      .then(function (response) {
        return {
          id: response.body.id,
          init_point: response.body.init_point,
          sandbox_init_point: response.body.sandbox_init_point,
        };
      });
    return result;
  },
};
