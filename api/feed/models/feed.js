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
    // async afterCreate(result) {
    //   // console.log("result", result);
    //   let bundle_count = await strapi.services.feed.count({
    //     bundleID: result.bundleID,
    //   });
    //   console.log("bundle", bundle_count);
    //   if (bundle_count === 0 && result?.paseador?.notification_token) {
    //     const r = send_notification([result.paseador.notification_token], {
    //       title: "Hey " + result.paseador.name + " tienes una nueva solicitud",
    //       body: "Nueva solicitud de paseo pendiente",
    //     });
    //     console.log(r);
    //   }
    // },
  },
};
