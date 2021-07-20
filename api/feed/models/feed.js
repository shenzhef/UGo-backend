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
      console.log("result", result);
      const r = send_notification([result.paseador.notification_token], {
        title: "Hey " + result.paseadaor.name + " tienes una nueva solicitud",
        body: "Nueva solicitud de paseo pendiente",
      });
      console.log(r);
    },
  },
};
