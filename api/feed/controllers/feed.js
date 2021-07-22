"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const {
  send_notification,
} = require("../../../extensions/users-permissions/controllers/User");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create_bundle(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.feed.create(data, { files });
    } else {
      if (ctx.request.body.days && Array.isArray(ctx.request.body.days)) {
        entity = await Promise.all(
          ctx.request.body.days.map(async (day, index) => {
            try {
              const r = await strapi.services.feed.create({
                ...ctx.request.body,
                date: day,
              });
              return r;
            } catch (err) {
              console.log(err);
            }
          })
        );

        // ctx.request.body.days.forEach((day) => {
        //   entity =
        // });
      }
    }
    if (entity[0].paseador.notification_token) {
      const r = send_notification([entity[0].paseador.notification_token], {
        title: "Hey " + entity[0].paseador.name + " tienes una nueva solicitud",
        body: "Nueva solicitud de paseo pendiente",
      });
    }
    return entity;
  },
  async update_bundle(ctx) {
    const { id } = ctx.params;
    console.log(id);
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.feed.update({ bundleID: id }, data, {
        files,
      });
    } else {
      entity = await strapi
        .query("feed")
        .model.updateMany({ bundleID: id }, ctx.request.body, { multi: true });
    }
    if (entity.nModified > 0) {
      return sanitizeEntity(entity, { model: strapi.models.feed });
    } else {
      return { error: true };
    }
  },
};
