import { makeFieldInternational } from "../../helper/makeFieldInternational";

export default {
  title: "Navigation Dropdown",
  name: "navigationDropdown",
  type: "object",
  fields: [

   ...makeFieldInternational({ name: "label", type: "string", title: "Label" }) ,
   
    {
      name: 'item',
      type: 'array',
      title: 'Main Navigation',
      of: [{ type: 'navigationItem' }]
    },
  ],
};
