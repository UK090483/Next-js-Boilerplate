import { seoSettings } from "../snippets"
export default {
  title: "SEO / Share Settings",
  name: "seo",
  type: "object",
  options: {
    collapsible: true,
  },
  fields: [
    ...seoSettings()
  ],
};
