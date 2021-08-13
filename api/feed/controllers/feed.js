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
    let dogs;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.feed.create(data, { files });
    } else {
      console.log(ctx.request.body);
      if (
        ctx.request.body.days &&
        Array.isArray(ctx.request.body.days) &&
        ctx.request.body.days.length > 0
      ) {
        entity = await Promise.all(
          ctx.request.body.days.map(async (day, index) => {
            dogs = await Promise.all(
              ctx.request.body.dogs.map(async (dog, index) => {
                try {
                  const dogs_fetch = await strapi.services.feed.create({
                    ...ctx.request.body,
                    date: day,
                    dog: dog._id,
                  });
                  return dogs_fetch;
                } catch (err) {
                  console.log(err);
                }
              })
            );
          })
        );

        // ctx.request.body.days.forEach((day) => {
        //   entity =
        // });
      } else {
        return { error: true };
      }
    }
    // if (entity[0].paseador.notification_token ) {
    //   const r = send_notification([entity[0].paseador.notification_token], {
    //     title: "Hey " + entity[0].paseador.name + " tienes una nueva solicitud",
    //     body: "Nueva solicitud de paseo pendiente",
    //   });
    // }
    // console.log("aca", { entity, dogs });
    return dogs;
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
