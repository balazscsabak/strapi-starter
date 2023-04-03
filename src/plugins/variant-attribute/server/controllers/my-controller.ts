import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('variant-attribute')
      .service('myService')
      .getWelcomeMessage();
  },
});
