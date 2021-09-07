
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: {
        api: {
          uri: 'https://api.commercetools.com/vsf-ct-dev/graphql',
          // uri: 'localhost:8081',
          authHost: 'https://auth.sphere.io',
          // authHost: 'localhost:8081',
          projectKey: 'vsf-izperime-dev',
          clientId: 'kuFT95wdTP4uH_hVOKjqfGEo',
          clientSecret: 'tklIDic86mgWrFy0oBHRQQmwX7ZC5wIP',
          scopes: [
            'manage_project:vsf-ct-dev'
          ]
        },
        currency: 'EUR',
        country: 'BG'
      }
    }
  }
};
