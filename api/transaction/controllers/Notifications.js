"use strict";
const mercadopago = require("mercadopago");
const { sanitizeEntity } = require("strapi-utils");
const {
  send_notification,
} = require("../../../extensions/users-permissions/controllers/User");
//REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel/credentials
mercadopago.configure({
  access_token:
    "TEST-7917744806992209-032021-ae7dd7888dc62c96df4bbdac4fa12d19-227590603",
});

module.exports = {};
