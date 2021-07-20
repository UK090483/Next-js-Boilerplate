import S from '@sanity/desk-tool/structure-builder'

import { FiSettings, FiGlobe, FiRepeat } from 'react-icons/fi'
import { HiOutlineSortDescending } from 'react-icons/hi'

import { GoThreeBars } from 'react-icons/go'



export default S.listItem()
  .title('Settings')
  .child(
    S.list()
      .title('Settings')
      .items([
        S.listItem()
          .title('Navigation')
          .child(
            S.editor()
              .id('navigation')
              .schemaType('navigation')
              .documentId('navigation')
          )
          .icon(GoThreeBars),
          S.listItem()
          .title('Footer')
          .icon(HiOutlineSortDescending)
          .child(S.documentTypeList('footer')),
        S.listItem()
          .title('Default SEO / Share')
          .child(
            S.editor()
              .id('seoSettings')
              .schemaType('seoSettings')
              .documentId('seoSettings')
          )
          .icon(FiGlobe),
       
        S.listItem()
          .title('Redirects')
          .child(S.documentTypeList('redirect').title('Redirects'))
          .icon(FiRepeat)
      ])
  )
  .icon(FiSettings)
