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
    async afterCreate(result) {
      let bundle_count = await strapi.services.paseo.count({
        bundleID: result.bundleID,
      });

      if (bundle_count === 0 && result?.paseador?.notification_token) {
        const r = send_notification([result.user.notification_token], {
          title: "Hey " + result.paseadaor.name + " han aceptado tu solicitud",
          body: "Tienes un nuevo paseo agendado",
        });
        console.log(r);
      }
    },
  },
};
