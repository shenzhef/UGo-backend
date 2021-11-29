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
    return entity.map((e) => sanitizeEntity(e, { model: strapi.models.feed }));
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
  async cancel_feed(ctx) {
    // return ctx.params;
    const { id } = ctx.params;
    console.log(id);
    // const {"canc} = ctx.query
    // let canceled = parseInt(ctx.query["cancelled.code"]);
    // console.log(canceled);
    const entity = await strapi
      .query("feed")
      .model.find({ user: id, ...ctx.query })
      .lean()
      .populate("paseador", "first_name");

    const fields = entity.map((entry) =>
      sanitizeEntity(entry, { model: strapi.models.feed })
    );
    return fields;
    // return sanitizeEntity(entity, { model: strapi.models.feed });
  },
  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.feed.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.feed.update({ id }, ctx.request.body);
      if (ctx.request.body.cancelled) {
        const notify_user = send_notification(
          [ctx.request.body.user_notification],
          {
            title: "¡Se canceló el paseo!🥺",
            body: `Lo sentimos! ${ctx.request.body.paseador.first_name} ha cancelado el paseo`,
          }
        );
      }
    }

    return sanitizeEntity(entity, { model: strapi.models.feed });
  },
  async find(ctx) {
    let entities;
    let populate = ctx.query["paseador.id"] ? "user" : "paseador";
    if (ctx.query._q) {
      entities = await strapi.services.feed.search(ctx.query);
    } else {
      entities = await strapi.query("feed").find(
        {
          ...ctx.query,
        },
        ["dog", "transaction", populate]
      );
    }
    return entities.map((entity) => {
      delete entity.paseador.bank_account;
      delete entity.paseador.paseador_zone;
      delete entity.paseador.days_available;
      return sanitizeEntity(entity, { model: strapi.models.feed });
    });
  },
};
