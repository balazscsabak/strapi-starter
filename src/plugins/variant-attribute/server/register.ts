import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: "values",
    plugin: "variant-attribute",
    type: "json",
  });
};
