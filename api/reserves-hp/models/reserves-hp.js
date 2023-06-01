"use strict";
const moment = require("moment");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      console.log("result", result);
      const {
        aob_purchased,
        aob_price,
        aob_date_start,
        aob_date_end,
        dog_age,
        dog_name,
        dog_raza,
        dog_food,
        dog_alergia,
        dog_comments,
        owner_name,
        owner_surname,
        owner_phone,
        owner_email,
        owner_dni,

      } = result;
      if (aob_purchased == "consulta") {
        try {
          await strapi.plugins["email"].services.email.send({
            to: owner_email,
            from: "houseparadise@ugo.com.ar",
            replyTo: "houseparadise@ugo.com.ar",
            template_id: "d-b1b607136aa842a986da67323054bd05",
            dynamic_template_data: {
              total_amount: aob_price,
              owner_first_name: owner_name,
              owner_surname: owner_surname,
              owner_phone: owner_phone,
              owner_email: owner_email,
              owner_dni: owner_dni,
              aob_date_start: moment(aob_date_start).format("DD/MM/YYYY"),
              aob_date_end: moment(aob_date_end).format("DD/MM/YYYY"),
              dog_age: dog_age,
              dog_name: dog_name,
              dog_raza: dog_raza,
              comments : dog_comments,
              dog_aleria : dog_alergia,
              dog_food : dog_food,
            },
          });
        } catch (error) {
          console.log("error email", error);
        }
      }
    },
  },
};
