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
      const r = send_notification([result.user.notification_token], {
        title: "Hey " + result.paseadaor.name + " han aceptado tu solicitud",
        body: "Tienes un nuevo paseo agendado",
      });
      console.log(r);
    },
  },
};
