const { sanitizeEntity } = require("strapi-utils");
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN_HP,
});
const URL = strapi.config.server.url;

module.exports = {
  async webhook(ctx) {
    let reserve;
    let responseMP;
    console.log("ctx.query", ctx.query);
    if (ctx.query["data.id"] !== "null" && ctx.query.type == "payment") {
      responseMP = mercadopago.payment
        .get(ctx.query["data.id"])
        .then(async (pago) => {
          try {
            let findExist = await strapi
              .query("hp-payments")
              .model.findOne({ payment_id: pago.body.id });
            if (findExist) {
              return responseMP;
            } else {
              let createPayment = await strapi.services["hp-payments"].create({
                payment_id: pago.body.id,
                status: pago.body.status,
                total_amount: pago.body.transaction_amount,
                payment_type: "mp",
                user: pago.body.metadata.user_id,
                //aca deeberia de pasarme el user_id asi lo linkeo
                // owner_name: pago.body.additional_info.payer.first_name,
                // owner_surname: pago.body.additional_info.payer.last_name,
                // owner_email: pago.body.payer.email,
                // owner_dni:,
                reserves_hp: pago.body.metadata.reserve,
              });
              console.log("createdPayment");
            }
          } catch (error) {
            console.log("error", error);
            return { error: error };
          }
          return pago;
        })
        .catch((e) => {
          console.log("error", e);
          return { error: e };
        });
    }
    return responseMP;
  },
  async backmp(ctx) {
    let mercadoPagoresponse;
    if (ctx.query.payment_id !== "null") {
      mercadoPagoresponse = await mercadopago.payment.get(ctx.query.payment_id);
      ctx.redirect(
        `https://ugo.com.ar?payment_id=${ctx.query.payment_id}
        &status=${ctx.query.status}&total_amount=${mercadoPagoresponse.body.transaction_amount}&reserve=${mercadoPagoresponse.body.metadata.reserve}`
      );
    }
  },
  async createpreference(ctx) {
    console.log("ctx", ctx);
    const { body } = ctx.request;

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
      metadata: {
        reserve: body.reserve,
        user_id: body.user_id,
      },
      payer: {
        name: body.owner_name,
        email: body.owner_email,
        surname: body.owner_surname,
      },
      notification_url: URL + "/hp-payments/notification",
      auto_return: "approved",
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
