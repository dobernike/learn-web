import { createContext } from 'react';

import SHOP_DATA from './shop.data';

const CollectionsContext = createContext({
  collections: SHOP_DATA,
  collectionsForPreview: Object.keys(SHOP_DATA).map((key) => SHOP_DATA[key]),
});

export default CollectionsContext;
