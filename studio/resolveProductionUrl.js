

const localUrl ='http://localhost:3000/api/preview?token=HULL'

const liveUrl='https://frida-next.vercel.app/api/preview?token=HULL'

const url= process.env.NODE_ENV === 'development'? localUrl:liveUrl
export default function resolveProductionUrl(document) {
  switch (document._type) {
    case 'page':
      return `${url}&slug=${document.slug?.current}&type=page`
    case 'indexPage':
      return `${url}&slug=''&type=indexPage`
    case 'post':
      return `${url}&slug=${document.slug?.current}&type=post`
    default:
      return undefined
  }
}