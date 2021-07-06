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

      const r = await strapi.query("user", "users-permissions").update(
        { _id: ctx.request.body.paseador },
        {
          valoration: {
            stars: 1,
            reviews_total:
              (await strapi.services.resenas.count({
                "paseador._id": ctx.request.body.paseador,
              })) + 1,
          },
        }
      );
      console.log("r", r);
      if (entity._id) {
      }
    }
    return sanitizeEntity(entity, { model: strapi.models.resenas });
  },
};
