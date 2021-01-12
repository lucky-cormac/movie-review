export const ENTITY_TYPES = {
  MOVIE: 'movie',
  USER: 'user',
};

export const ENTITY_LIST_ROUTE_MAP = {
  [ENTITY_TYPES.MOVIE]: '/movies',
  [ENTITY_TYPES.USER]: '/users',
};

export const ENTITY_TABLE_TITLE_MAP = {
  [ENTITY_TYPES.MOVIE]: 'Movie List',
  [ENTITY_TYPES.USER]: 'User List',
};

export const ENTITY_TABLE_ADD_LABEL_MAP = {
  [ENTITY_TYPES.MOVIE]: 'Add Movie',
  [ENTITY_TYPES.USER]: 'Add User',
};

export const ENTITY_TABLE_DELETE_LABEL_MAP = {
  [ENTITY_TYPES.MOVIE]: 'Delete Movies',
  [ENTITY_TYPES.USER]: 'Delete Users',
};

export const INITIAL_ORDER = 'asc';
export const INITIAL_PAGE = 0;
export const INITIAL_ROWS_PER_PAGE = 10;
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];
