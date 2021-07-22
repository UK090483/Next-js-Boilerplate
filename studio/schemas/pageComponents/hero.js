export default {
  name: "hero",
  type: "object",
  title: "Hero",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
    },
    {
      title: "Text",
      name: "text",
      type: "text",
    },
    {
      title: "Button text",
      name: "btnText",
      type: "string",
    },
    {
      title: "Button link",
      name: "btnLink",
      type: "string",
    },
    {
      title: "Image",
      name: "image",
      type: "figure",
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: [
          { title: 'full', value: 'full' },
          { title: '1/2', value: '1/2' },
          { title: '1/3', value: '1/3' },
          { title: '2/3', value: '2/3' },
         
        ]
      },
      initialValue: 'full'
    },
  ],
  preview: {
    select: {
      image: "image",
      content: "content",
      bgColor: "bgColor",
    },
    prepare({ image }) {
      return {
        title: "hero",
        media: image,
      };
    },
  },
};
