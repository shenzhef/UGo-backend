const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });
module.exports = {
  async find_paseadores(ctx, next, { populate } = {}) {
    let users;
    let users_reviews;
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

      // users_reviews = await Promise.all(
      //   users.map(async (user) => {
      //     const count_review = await strapi
      //       .query("resenas")
      //       .count({ "paseador._id": user._id });

      //     return { ...user, reviews: count_review };
      //   })
      // );
    }

    ctx.body = users.map(sanitizeUser);
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
