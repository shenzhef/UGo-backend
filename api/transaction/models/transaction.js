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
            title: "Pago confirmado!😎",
            body:
              result.user.first_name +
              " ,tu pago se ha realizado exitosamente,",
          }
        );
        console.log(notify_user);
      }
      if (result.paseador.notification_token) {
        const notify_paseador = send_notification(
          [result.paseador.notification_token],
          {
            title: "¡Nueva solicitud!",
            body: `${result.paseador.first_name} recibiste una solicitud para pasear a un ! Tenes 30 minutos para aceptarla. ¡Chequela!`,
          }
        );
      }
    },
  },
};
