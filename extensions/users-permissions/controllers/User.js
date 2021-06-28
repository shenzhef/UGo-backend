const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });
module.exports = {
  async find_paseadores(ctx, next, { populate } = {}) {
    let users;
    let reviews;
    if (_.has(ctx.query, "_q")) {
      // use core strapi query to search for users
      users = await strapi
        .query("user", "users-permissions")
        .search(ctx.query, populate);
    } else {
      reviews = await strapi
        .query("resenas")
        .count({ "paseador._id": "60a3ad4ba03ae80015602b1f" });

      users = await strapi.plugins["users-permissions"].services.user.fetchAll(
        ctx.query,
        populate
      );
      // users.forEach((user) => {

      // })
      // users.map(async (user) => {
      //   const count_review = await strapi
      //     .query("resenas")
      //     .count({ "paseador._id": user._id });
      //   console.log(count_review);
      // });
      // console.log(users);
    }

    ctx.body = users.map(sanitizeUser);
  },
};
