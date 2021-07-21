const { sanitizeEntity } = require("strapi-utils");
const { getDistance } = require("geolib");
const {
  send_notification,
} = require("../../../extensions/users-permissions/controllers/User");

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
    if (
      ctx.request.body.notifyTokens &&
      Array.isArray(ctx.request.body.notifyTokens)
    ) {
      if (ctx.request.body.notifyTokens.length > 0) {
        const r = send_notification(ctx.request.body.notifyTokens, {
          title: "El paseador esta cerca.",
          body: "Recorda tener a tu perro listo!.",
        });
      }
    }

    // return sanitizeEntity(entity, { model: strapi.models.paseo });
    // console.log(entity.schema);
    return entity;
  },
};
