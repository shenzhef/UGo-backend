module.exports = ({ env }) => ({
  settings: {
    cache: {
      enabled: env.NODE_ENV == "production" ? true : false,
      models: [
        {
          model: "turnos-paseadores",
          singleType: true,
        },
        {
          model: "reviews",
          singleType: true,
        },
        {
          model: "faq",
          singleType: true,
        },
      ],
    },
    gzip: {
      enabled: true,
      options: {
        br: false,
      },
    },
  },
});
