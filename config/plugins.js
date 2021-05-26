module.exports = ({ env }) => ({
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: "dqpllefve",
      api_key: "712855399114227",
      api_secret: "54YWFqqZ2iiNrwiaWoATSKq3cLs",
    },
    actionOptions: {
      upload: {},
      delete: {},
    },
  },
  email: {
    provider: "sendmail",
    settings: {
      defaultFrom: "martin.miauro@gmail.com",
      defaultReplyTo: "martin.miauro@gmail.com",
    },
  },
});
