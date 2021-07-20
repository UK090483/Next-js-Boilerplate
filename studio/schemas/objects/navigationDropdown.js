export default {
  title: "Navigation Dropdown",
  name: "navigationDropdown",
  type: "object",
  fields: [
    { name: "label", type: "string", title: "Label" },
    { name: "label_en", type: "string", title: "Label En" },
    {
      name: 'item',
      type: 'array',
      title: 'Main Navigation',
      of: [{ type: 'navigationItem' }]
    },
  ],
};
