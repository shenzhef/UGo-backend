const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.resenas.create(data, { files });
    } else {
      entity = await strapi.services.resenas.create(ctx.request.body);
      let previous_reviews = await strapi.services.resenas.count({
        "paseador._id": ctx.request.body.paseador,
      });
      console.log("prevous", previous_reviews);
      const r = await strapi.query("user", "users-permissions").update(
        { _id: ctx.request.body.paseador },
        {
          valoration: {
            stars: 4,
            reviews_total: previous_reviews,
          },
        }
      );
      if (entity._id) {
        //update paseo
      }
    }
    return sanitizeEntity(entity, { model: strapi.models.resenas });
  },
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.resenas.search(ctx.query);
    } else {
      entities = await strapi.query("resenas").find(
        {
          ...ctx.query,
          comment: { $ne: "" },
        },
        ["user"]
      );
    }
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.resenas })
    );
  },
};
