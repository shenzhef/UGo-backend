"use strict";
const { sanitizeEntity } = require("strapi-utils");
const mercadopago = require("mercadopago");
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});
const URL = strapi.config.server.url;

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    console.log(id);
    // const entity = await strapi
    //   .query("transaction")
    //   .model.findOne({
    //     payment_id: id,
    //   })
    //   .select("bundleID")
    //   .populate([
    //     {
    //       path: "paseo",
    //       model: "paseo",
    //     },
    //   ]);
    const entity = await strapi.services.transaction.findOne({
      payment_id: id,
    });
    console.log("entity", entity);
    return sanitizeEntity(entity, { model: strapi.models.transaction });
  },
  async createpreference(ctx) {
    const { body } = ctx.request;
    //process.env
    console.log(body);
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
      metadata: {
        user_id: body.user_id,
        paseador_id: body.external_reference,
        bundle_id: body.bundleID,
        linking_url: body.linking_url,
      },
      // capture: false,
      // payer: body.payer,
      external_reference: body.external_reference,
      statement_descriptor: "UGo Argentina",
      back_urls: {
        success: URL + "/transactions/feedback",
        failure: URL + "/transactions/feedback",
        pending: URL + "/transactions/feedback",
      },
      payment_methods: {
        installments: 1,
      },
      notification_url: URL + "/transactions/notification",

      auto_return: "approved",
    };
    // var filters = {
    //   email: body.payer.email,
    // };

    // mercadopago.customers
    //   .search(filters)
    //   .then(function (customer) {
    //     // if (customer.response.results.length == 0) {
    //     // mercadopago.customers
    //     //   .create(ctx.body.payer)
    //     //   .then((customer_created) => {
    //     //     console.log('customer created', customer_created);
    //     //     return customer_created;
    //     //   })
    //     //   .catch((e) => {
    //     //     console.log('error', e);
    //     // });
    //     console.log("customer", customer.response.results);

    //   })
    //   .catch((err) => console.log("err", err));
    const result = mercadopago.preferences
      .create(preference)
      .then(function (response) {
        console.log(response);
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
    // console.log(ctx.query);
    let mercadoPagoresponse;
    if (ctx.query.payment_id !== "null") {
      mercadoPagoresponse = await mercadopago.payment.get(ctx.query.payment_id);
      // console.log('typeof linking',typeof ctx.query.status);
      console.log("body", mercadoPagoresponse.body);
      ctx.redirect(
        `https://ugo.com.ar/success/?payment_id=${ctx.query.payment_id}
        &status=${ctx.query.status}&total_amount=${mercadoPagoresponse.body.transaction_amount}&linking_url=${mercadoPagoresponse.body.metadata.linking_url}`
      );
    }

    // ctx.sendFile(__dirname + "/transactions.html");
    // `<p><a style="color:red;" href=${
    //   ctx.query.linking_url +
    //   "?payment_id=" +
    //   ctx.query.payment_id +
    //   "&status=" +
    //   ctx.query.status +
    //   "&total_amount=500"
    //   // mercadoPagoresponse.body.transaction_amount
    // }>Volver a ugo</p>`
  },
  async webhook(ctx) {
    console.log("aca", ctx.query);
    // ctx.send("oka!");
    let entity;
    let paseo;
    let responseMP;

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
    // return sanitizeEntity(entity, { model: strapi.models.transaction });
  },
};
