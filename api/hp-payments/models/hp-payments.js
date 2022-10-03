"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  lifecycles: {
    async afterCreate(result) {
      const {
        total_amount,
        payment_id,
        status,
        owner_name,
        owner_surname,
        owner_email,
        reserves_hp,
      } = result;

      let entity;
      if (total_amount && payment_id) {
        if (status == "approved") {
          entity = await strapi.query("reserves-hp").model.updateOne(
            {
              _id: reserves_hp,
            },
            {
              payment_id: payment_id,
              payment_status: status,
              hp_payment: result._id,
              payment_type: "mp",
            }
          );
        }
      }
      console.log("entity reserve", entity);

      if (status == "approved") {
        try {
          await strapi.plugins["email"].services.email.send({
            to: owner_email,
            from: "ugo@marcopolo.agency",
            replyTo: "ugo@marcopolo.agency",
            subject: "Tu estadia en House paradise fue confirmada!",
            template_id: "d-34e858ea123b44b38e1a5682774c95e4",
            dynamic_template_data: {
              total_amount: total_amount,
              owner_first_name: owner_name,
              owner_surname: owner_surname,
              owner_phone: result.reserves_hp.owner_phone,
              aob_date_start: result.reserves_hp.aob_date_start,
              aob_date_end: result.reserves_hp.aob_date_end,
              dog_age: result.reserves_hp.dog_age,
              dog_name: result.reserves_hp.dog_name,
              dog_raza: result.reserves_hp.dog_raza,
              owner_dni: result.reserves_hp.dni,
            },
          });
        } catch (error) {
          console.log("error emaik", error);
        }
      }
    },
  },
};
