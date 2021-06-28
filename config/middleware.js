module.exports = ({ env }) => ({
  settings: {
    cache: {
      enabled: true,
      models: [
        {
          model: "turnos-paseadores",
          singleType: true,
        },
        {
          model: "reviews",
          singleType: true,
        },
      ],
    },
  },
});
