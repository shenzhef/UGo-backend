"use strict";
const { sanitizeEntity } = require("strapi-utils");

const {
  send_notification,
} = require("../../../extensions/users-permissions/controllers/User");
const moment = require("moment");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      if (result.user && result.user?.notification_token) {
        const notify_user = send_notification(
          [result.user.notification_token],
          {
            title: "Pago confirmado!😎",
            body:
              result.user.first_name +
              ", tu pago se ha realizado exitosamente.",
          }
        );
        console.log(notify_user);
      }
      if (result.paseador && result.paseador.notification_token) {
        const notify_paseador = send_notification(
          [result.paseador.notification_token],
          {
            title: "¡Nueva solicitud!😁",
            body: `${result.paseador.first_name}, recibiste una solicitud para pasear a un 🐶! Tenés 30 minutos para aceptarla. ¡Chequeala!`,
          }
        );
      }
      console.log("ctx", result);
      const { date, total_amount, payment_id, status, paseador } = result;
      let entity;
      if (date && total_amount && payment_id) {
        if (status == "approved") {
          entity = await strapi.services.payments.create({
            payment_id,
            status: "pending",
            total_amount,
            date,
            paseador,
            transaction: result._id,
            expiration: moment(date).add(30, "days").format("YYYY-MM-DD"),
          });
        }
      }
      console.log("entity", entity);
    },
    // async beforeCreate(ctx) {
    //   console.log("ctx", ctx);
    //   const { date, total_amount, payment_id, status, paseador } = ctx;
    //   let entity;
    //   if (date && total_amount && payment_id) {
    //     if (status == "approved") {
    //       entity = await strapi.services.payments.create({
    //         payment_id,
    //         status: "pagado",
    //         total_amount,
    //         date,
    //         // transaction:ctx
    //         expiration: moment(date).add(14, "days").format("YYYY-MM-DD"),
    //       });
    //     }
    //   }
    //   console.log("entity", entity);
    //   return entity;
    // },
  },
};
