export const defaultBockContent = {
  name: 'content',
  type: 'array',
  title: 'Page sections',
  description: 'Add, edit, and reorder sections',
  of: [
    // { type: 'section' },
    // { type: 'carouselHero' },
    // { type: 'artworks' },
    // { type: 'artists' },
    // { type: 'posts' },
    // { type: 'categories' },
    // { type: 'products' },
    // { type: 'marquee' },
    // { type: 'quotes' }
  ]
}

export function colorList(skip) {
  const list = [
    { title: 'Black', value: 'black' },
    { title: 'White', value: 'white' },
    { title: 'Pink', value: 'pink' },
    { title: 'Red', value: 'red' },
    { title: 'Grey', value: 'grey' }
  ]
  if (!Array.isArray(skip)) return list

  return list.filter(listItem => !skip.includes(listItem.value))
}

export function sizesList(skip) {
  const list = [
    { title: 's', value: 's' },
    { title: 'm', value: 'm' },
    { title: 'l', value: 'l' },
    { title: 'xl', value: 'xl' },
    { title: 'xxl', value: 'xxl' }
  ]
  if (!Array.isArray(skip)) return list

  return list.filter(listItem => !skip.includes(listItem.value))
}


export const seoSettings=()=>{

  return [    {
    title: "Meta Title",
    name: "metaTitle",
    type: "string",
    description: "Title used for search engines and browsers.",
    validation: (Rule) =>
      Rule.max(50).warning(
        "Longer titles may be truncated by search engines"
      ),
  },
  {
    title: "Meta Description",
    name: "metaDesc",
    type: "text",
    rows: 3,
    description: "Description for search engines.",
    validation: (Rule) =>
      Rule.max(150).warning(
        "Longer descriptions may be truncated by search engines"
      ),
  },
  {
    title: "Share Title",
    name: "shareTitle",
    type: "string",
    description: "TItle used for social sharing cards.",
    validation: (Rule) =>
      Rule.max(50).warning("Longer titles may be truncated by social sites"),
  },
  {
    title: "Share Description",
    name: "shareDesc",
    type: "text",
    rows: 3,
    description: "Description for social sharing cards.",
    validation: (Rule) =>
      Rule.max(150).warning(
        "Longer descriptions may be truncated by social sites"
      ),
  },
  {
    title: "Share Graphic",
    name: "shareGraphic",
    type: "image",
    description: "Share graphics will be cropped to 1200x630",
    options: {
      hotspot: true
    },
  }]
}