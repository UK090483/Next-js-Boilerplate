

export default {
  title: 'Config',
  name: 'configSettings',
  type: 'document',
   __experimental_actions: ['update', 'publish'], // disable for initial publish
  fields: [
    {
      name: 'url',
      title: 'Site Url',
      type: 'string',
    },
    {
      name: 'kontaktTel',
      title: 'Kontakt Tel',
      type: 'string',
    },
    {
      name: 'kontaktMail',
      title: 'Kontakt Mail',
      type: 'string',
    },
    {
      name: 'kontaktAdress',
      title: 'Kontakt Adress',
      type: 'text',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Default SEO / Share'
      }
    }
  }
}
