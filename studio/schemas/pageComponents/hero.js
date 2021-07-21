export default {
  name: "hero",
  type: "object",
  title: "Hero",
  fields: [
    {
      title: "Image",
      name: "image",
      type: "figure",
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
