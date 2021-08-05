import S from '@sanity/desk-tool/structure-builder'


import WebPage from './webpage/Webpage'

 import Blog from './blog/Blog'

export default () =>
  S.list()
    .title('Content')
   .items([ 
     WebPage,
      Blog
    ])
