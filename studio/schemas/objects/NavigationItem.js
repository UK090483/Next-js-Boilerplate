import { makeFieldInternational } from "../../helper/makeFieldInternational";

export default {
  title: "Navigation Item",
  name: "navigationItem",
  type: "object",
  fields: [

    ...makeFieldInternational( { name: "label", type: "string", title: "Label" }),
   
    {
      title: "Internal link",
      description: "Use this to link between pages on the website",
      name: "internalLink",
      type: "reference",
      weak: false,
      to: [{ type: "indexPage" }, { type: "page" }],
    },
    {
      title: "External link",
      name: "link",
      type: "url",
    },
  ],
};
