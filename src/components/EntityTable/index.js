import { withStyles } from '@material-ui/core/styles';
import EntityTable from './EntityTable';
import { TABLE_STYLES } from './styles';

export { ENTITY_TYPES } from './constants';

export default withStyles(TABLE_STYLES)(EntityTable);
