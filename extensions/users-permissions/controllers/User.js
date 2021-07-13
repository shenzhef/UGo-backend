const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });
module.exports = {
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

      users = await await strapi
        .query("user", "users-permissions")
        .find({ paseador: true, ...ctx.query }, populate);

      user_paseos = await Promise.all(
        users.map(async (user) => {
          const count_paseos = await strapi
            .query("paseo")
            .count({ "paseador._id": user._id })
            .filter((prev) => prev.status.started == "done");

          return { ...user, total_paseos: count_paseos };
        })
      );
    }

    ctx.body = user_paseos.map(sanitizeUser);
  },
  async activity(ctx) {
    const id = ctx.state.user._id;
    const entity = await strapi.services.paseo.count({
      "user._id": id,
      ...ctx.query,
    });

    return { total_paseos: entity, user: id };
  },
};
