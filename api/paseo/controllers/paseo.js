const { sanitizeEntity } = require("strapi-utils");
const { getDistance } = require("geolib");

module.exports = {
  async find(ctx) {
    let entities;
    // if (ctx.query["status.started"])
    //   ctx.query["status.started"] = parseInt(ctx.query["status.started"]);

    if (ctx.query._q) {
      entities = await strapi.services.paseo.search(ctx.query);
    } else {
      entities = await strapi.services.paseo.find(ctx.query);
      //   entities = await strapi.query("paseo").model.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.paseo })
    );
  },
  async updateTrip(ctx) {
    // const { id } = ctx.params;
    const paseos_id = ctx.request.body.paseos_id;

    let entity;

    entity = strapi.query("paseo").model.update(
      {
        _id: { $in: paseos_id },
      },
      {
        $push: { ...ctx.request.body },
      },
      {
        upsert: true,
        multi: true,
        projection: {
          bundleID: true,
        },
      }
    );

    // return sanitizeEntity(entity, { model: strapi.models.paseo });
    // console.log(entity.schema);
    return entity;
  },
};
