"use strict";
const { sanitizeEntity } = require("strapi-utils");

const {
  send_notification,
} = require("../../../extensions/users-permissions/controllers/User");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      if (result.user?.notification_token) {
        const notify_user = send_notification(
          [result.user.notification_token],
          {
            title: "Pago " + result.payment_id + " ha sido exitoso",
            body: "Pago exitoso en Ugo del paquete " + result.bundleID,
          }
        );
        console.log(notify_user);
      }
      if (result.paseador.notification_token) {
        const notify_paseador = send_notification(
          [result.paseador.notification_token],
          {
            title:
              "Hey " +
              result.paseador.first_name +
              " tienes una nueva solicitud",
            body: "Nueva solicitud de paseo pendiente",
          }
        );
      }
    },
  },
};
