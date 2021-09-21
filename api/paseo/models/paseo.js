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
      console.log("bundle", bundle_count);
      if (bundle_count === 0 && result?.paseador?.notification_token) {
        const r = send_notification([result.user.notification_token], {
          title:
            "Hey " + result.paseadaor.first_name + " han aceptado tu solicitud",
          body: "Tienes un nuevo paseo agendado",
        });
        console.log(r);
      }
    },
    async afterUpdate(result, params, data) {
      if (data.status == 2) {
        const r = send_notification([result.user.notification_token], {
          title: "Hey " + result.user.first_name,
          body: "Han finalizado el paseo de " + result.dog.name,
        });
      } else if (data.status == 1) {
        const r = send_notification([result.user.notification_token], {
          title: "Hey " + result.user.first_name,
          body: "Han empezado el paseo de " + result.dog.name,
        });
      }
    },
  },
};
