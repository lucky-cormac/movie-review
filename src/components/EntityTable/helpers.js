import { ENTITY_LIST_ROUTE_MAP } from './constants';

export const cellAlignment = (isNumeric) => (isNumeric ? 'right' : 'left');

export const getCreateEntityRoute = (entityType) =>
  `${ENTITY_LIST_ROUTE_MAP[entityType]}/new`;

export const getEditEntityRoute = (entityType, entityId) =>
  `${ENTITY_LIST_ROUTE_MAP[entityType]}/${entityId}`;
