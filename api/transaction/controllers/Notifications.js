"use strict";
const mercadopago = require("mercadopago");

//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configurations.setAccessToken(
  "TEST-2673649138924674-062117-027521d8ee3db857ed96256a55e4dd4f-102188289"
);
module.exports = {
  async webhook(ctx) {
    console.log("aca", ctx.query);

    // if (request.query.payment_id !== 'null') {
    //   mercadopago.payment
    //     .get(request.query.payment_id)
    //     .then((pago) => {
    //       console.log(pago.body);
    //       fetch('https://u-go-backend-2teup.ondigitalocean.app/transactions', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           payment_id: request.query.payment_id,
    //           status: request.query.status,
    //           total_amount: pago.body.transaction_amount,
    //           paseador: pago.body.metadata.paseador_id,
    //           user: pago.body.metadata.user_id,
    //           bundleID: pago.body.metadata.bundle_id,
    //         }),
    //       }).then((r) => {
    //         response.render(__dirname + '/index.html', {
    //           payment_id: request.query.payment_id,
    //           payment_status: request.query.status,
    //           linking_url: request.query.linking_url,
    //         });
    //       });
    //     })
    //     .catch((e) => {
    //       console.log('error', e);
    //       response.redirect(request.query.linking_url);
    //     });
    // } else {
    //   response.redirect(request.query.linking_url);
    // }
    return ctx.send(ctx.query);
  },
};
