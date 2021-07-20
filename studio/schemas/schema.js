// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blockContent from './blockContent';
import category from './category';
import post from './documents/post';
import author from './author';

import navigation from './documents/navigation'
import navigationItem from './objects/NavigationItem'
import navigationDropdown from './objects/navigationDropdown'
import page from './documents/page'

import indexPage from './documents/indexPage'
import footer from './documents/footer'
import SettingsSeo from './documents/settings-seo'
import seo from './objects/Seo'
import redirect from './documents/redirect'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then 
  types: schemaTypes.concat([
    navigation,
    navigationItem,
    navigationDropdown,
    indexPage,
    page,
    SettingsSeo,
    seo,
    footer,
    post,
    redirect,
    category,
    blockContent,
  ]),
});
