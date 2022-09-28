const { sanitizeEntity } = require("strapi-utils");
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});
const URL = strapi.config.server.url;

module.exports = {
  async webhook(ctx) {
    console.log("ctx", ctx);
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
        success: URL + "/hp-payments/feedback",
        failure: URL + "/hp-payments/feedback",
        pending: URL + "/hp-payments/feedback",
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

  async feedback(ctx) {
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
};
