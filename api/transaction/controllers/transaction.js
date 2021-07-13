"use strict";
const { sanitizeEntity } = require("strapi-utils");
const mercadopago = require("mercadopago");
// const fetch = require("node-fetch");

//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken(
  "TEST-2673649138924674-062117-027521d8ee3db857ed96256a55e4dd4f-102188289"
);
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

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
    let preference = {
      items: [
        {
          title: body.title,
          unit_price: Number(body.price),
          quantity: Number(body.quantity),
          currency_id: "ARS",
        },
      ],
      metadata: {
        user_id: body.user_id,
        paseador_id: body.external_reference,
        bundle_id: body.bundleID,
      },
      capture: false,
      payer: body.payer,
      external_reference: body.external_reference,
      back_urls: {
        success:
          strapi.config.server.url +
          "/transactions/feedback?linking_url=" +
          body.linking_url,
        failure: "http://localhost:8080/transactions/feedback",
        pending: "http://localhost:8080/transactions/feedback",
      },
      payment_methods: {
        installments: 1,
      },
      notification_url: strapi.config.server.url + "/transactions/notification",

      auto_return: "approved",
    };
    var filters = {
      email: body.payer.email,
    };
    // mercadopago.customers
    //   .get(body.mp_id)
    //   .then(function (customer) {
    // if (customer.response.results.length == 0) {
    //   mercadopago.customers
    //     .create(ctx.body.payer)
    //     .then((customer_created) => {
    //       console.log('customer created', customer_created);
    //       return customer_created;
    //     })
    //     .catch((e) => {
    //       console.log('error', e);
    //     });
    // } else {
    // console.log('customer', customer.response);
    // let responseObj = {};
    const result = mercadopago.preferences
      .create(preference)
      .then(function (response) {
        console.log(response);
        return {
          id: response.body.id,
          init_point: response.body.init_point,
          sandbox_init_point: response.body.sandbox_init_point,
          // customer: customer,
        };
      });
    return result;
    // }
    // })

    // .catch(function (error) {
    //   console.log(error);
    // });
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  },
  async feedback(ctx) {
    console.log("ACA");
    console.log(ctx.query);
    ctx.send(
      `<p><a style="color:red;" href=${ctx.query.linking_url}>Volver a ugo</p>`
    );
  },
};
