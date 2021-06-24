"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findOne(ctx) {
    const { id } = ctx.params;
    console.log(id);
    // const entity = await strapi
    //   .query("transaction")
    //   .model.findOne({
    //     payment_id: id,
    //   })
    //   .select("bundleID")
    //   .populate([
    //     {
    //       path: "paseo",
    //       model: "paseo",
    //     },
    //   ]);
    const entity = await strapi.services.transaction.findOne({
      payment_id: id,
    });
    console.log("entity", entity);
    return sanitizeEntity(entity, { model: strapi.models.transaction });
  },
};
