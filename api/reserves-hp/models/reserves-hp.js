"use strict";

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
        owner_name,
        owner_surname,
        owner_phone,
        owner_email,
        owner_dni,
      } = result;
      if (aob_purchased == "consulta") {
        try {
          console.log("ENVIA EMAIL");

          await strapi.plugins["email"].services.email.send({
            to: owner_email,
            from: "ugo@marcopolo.agency",
            replyTo: "ugo@marcopolo.agency",
            subject: "Tu presupuesto para House paradise fue enviado!",
            template_id: "d-34e858ea123b44b38e1a5682774c95e4",
            dynamic_template_data: {
              total_amount: aob_price,
              owner_first_name: owner_name,
              owner_surname: owner_surname,
              owner_phone: owner_phone,
              owner_email: owner_email,
              owner_dni: owner_dni,
              aob_date_start: aob_date_start,
              aob_date_end: aob_date_end,
              dog_age: dog_age,
              dog_name: dog_name,
              dog_raza: dog_raza,
            },
          });
        } catch (error) {
          console.log("error emaik", error);
        }
      }
    },
  },
};
