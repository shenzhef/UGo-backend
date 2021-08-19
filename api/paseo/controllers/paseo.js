const { sanitizeEntity } = require("strapi-utils");
const { getDistance } = require("geolib");
const {
  send_notification,
} = require("../../../extensions/users-permissions/controllers/User");
const { update_bundle } = require("../../feed/controllers/feed");

module.exports = {
  async create_bundle(ctx) {
    let entity;
    let dogs;
    let updatedFeeds;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.paseo.create(data, { files });
    } else {
      if (ctx.request.body.days && Array.isArray(ctx.request.body.days)) {
        entity = await Promise.all(
          ctx.request.body.days.map(async (day, index) => {
            dogs = await Promise.all(
              ctx.request.body.dogs.map(async (dog, index) => {
                try {
                  const dogs_fetch = await strapi.services.paseo.create({
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
      }
    }

    const update_feed = await strapi
      .query("feed")
      .model.updateMany(
        { bundleID: dogs[0].bundleID },
        { isAccepted: true },
        { multi: true }
      );
    console.log(dogs, update_feed);
    if (dogs[0].user.notification_token) {
      const r = send_notification([dogs[0].user.notification_token], {
        title: "Hey " + dogs[0].user.name + " han aceptado tu solicitud",
        body: "Tienes un nuevo paseo agendado",
      });
    }
    return dogs;
  },
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

    entity = await strapi.query("paseo").model.updateMany(
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
    if (ctx.request.body.notify) {
      const r = await send_notification(
        ctx.request.body.notify.token,
        ctx.request.body.notify.message
      );
      console.log("r", r);
    }
    // return sanitizeEntity(entity, { model: strapi.models.paseo });
    // console.log(entity.schema);
    return entity;
  },
  async notify(ctx) {
    let result;
    // log_entity = await strapi.query("paseo").model.updateMany(
    //   {
    //     _id: {
    //       $in: ctx.request.body.notifyTokens.map((t) => t.paseos_id),
    //     },
    //   },
    //   {
    //     $push: {
    //       logs: {
    //         type: "coming",
    //         timestamp: new Date().getTime(),
    //       },
    //     },
    //   },
    //   {
    //     upsert: true,
    //     multi: true,
    //     projection: {
    //       bundleID: true,
    //     },
    //   }
    // );
    if (Array.isArray(ctx.request.body.token)) {
      result = await send_notification(
        ctx.request.body.token,
        ctx.request.body.message,
        ctx.request.body.data
      );
    }
    return result;
  },
};
