const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });
module.exports = {
  async send_notification(somePushTokens, message, data) {
    let messages = [];

    for (let pushToken of somePushTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
      console.log("each", pushToken);
      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: pushToken,
        sound: "default",
        title: message.title,
        body: message.body,
        data: data,
      });
    }
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);

          // NOTE: If a ticket contains an error code in ticket.details.error, you
          // must handle it appropriately. The error codes are listed in the Expo
          // documentation:
          // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
          console.error(error);
        }
      }
      // return tickets;
      console.log(tickets);
      return tickets;
    })();
    // let result = await sendChuncks();
    return tickets;
    // const sendChuncks = async () => {
    //   for (let chunk of chunks) {
    //     try {
    //       let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    //       tickets.push(...ticketChunk);

    //       // NOTE: If a ticket contains an error code in ticket.details.error, you
    //       // must handle it appropriately. The error codes are listed in the Expo
    //       // documentation:
    //       // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    //   // return tickets;
    //   console.log(tickets);
    //   return tickets;
    // };
    // let result = await sendChuncks();
    // return result;
  },
  async find_paseadores(ctx, next, { populate } = {}) {
    let users;
    let user_paseos;
    let reviews;
    if (_.has(ctx.query, "_q")) {
      // use core strapi query to search f
      users = await strapi
        .query("user", "users-permissions")
        .search(ctx.query, populate);
    } else {
      // const paseador_id = ctx.state.user._id;

      // users = await strapi.plugins["users-permissions"].services.user.fetchAll(
      //   ctx.query,
      //   populate
      // );
      // await strapi.query("paseo").model
      users = await strapi.query("user", "users-permissions").model.find(
        {
          paseador: true,
          confirmed: true,
          blocked: false,
          // days_available: { days: ["1", "2"] }, Este funca
          // turnos: { $elemMatch: { ref: { _id: "61af531717698b001b4e0fdc" } } }, // este tengo q buscar start
          ...ctx.query,
        },
        []
      );
      user_paseos = await Promise.all(
        users.map(async (user) => {
          delete user.bank_account;
          delete user.passowrd;
          delete user.email;
          delete user.confirmationToken;
          const count_paseos = await strapi
            .query("paseo")
            .count({ "paseador._id": user._id, status: { started: 1 } });
          // .filter((prev) => prev.status.started == "done");
          return { ...user, total_paseos: count_paseos };
        })
      );
    }

    return user_paseos.map((user) =>
      sanitizeEntity(user, {
        model: strapi.query("user", "users-permissions").model,
      })
    );
  },
  async activity(ctx) {
    const id = ctx.state.user._id;
    const entity = await strapi.query("paseo").count({
      "user._id": id,
      status: { started: 1 },
      ...ctx.query,
    });

    return { total_paseos: entity, user: id };
  },
};
