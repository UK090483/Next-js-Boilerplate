import { seoSettings } from "../snippets"

export default {
  title: 'Default SEO / Share',
  name: 'seoSettings',
  type: 'document',
   __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
  ...seoSettings()
  ],
  preview: {
    prepare() {
      return {
        title: 'Default SEO / Share'
      }
    }
  }
}
