import { getSanityClient } from './sanity.server';

export const getAllDocSlugs: (
  doc: string
) => Promise<null | { slug: string }[]> = async (doc) => {
  return getSanityClient().fetch(
    `*[_type == "${doc}"]{ "slug": slug.current }`
  );
};

export const getAllDocPaths = async (doc: string) => {
  const allPages = await getAllDocSlugs(doc);

  if (!allPages) return { paths: [], fallback: true };
  if (!Array.isArray(allPages)) return { paths: [], fallback: true };

  return {
    paths:
      allPages.reduce((acc, page) => {
        if (!page.slug) return [...acc];
        const slugs = page.slug.split('/').filter((e: string) => e);

        return [
          ...acc,
          {
            params: {
              slug: slugs,
            },
            locale: 'dk',
          },
          {
            params: {
              slug: slugs,
            },
            locale: 'en',
          },
        ];
      }, [] as any[]) || [],
    fallback: false,
  };
};
