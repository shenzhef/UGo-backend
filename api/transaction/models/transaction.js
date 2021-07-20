"use strict";

const {
  send_notification,
} = require("../../../extensions/users-permissions/controllers/User");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    afterCreate(result) {
      const r = send_notification(
        [result.user.notification_token, result.paseador.notification_token],
        {
          title: "Pago " + result.payment_id + " ha sido exitoso",
          body: "Pago exitoso en Ugo",
        }
      );
      console.log(r);
    },
  },
};
