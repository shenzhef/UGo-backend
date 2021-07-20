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
        const r = send_notification([result.user.notification_token], {
          title: "Pago " + result.payment_id + " ha sido exitoso",
          body: "Pago exitoso en Ugo del paquete " + result.bundleID,
        });
        console.log(r);
      }
    },
  },
};
