import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import {
  ENTITY_TABLE_TITLE_MAP,
  ENTITY_TABLE_ADD_LABEL_MAP,
  ENTITY_TABLE_DELETE_LABEL_MAP,
} from './constants';
import { getCreateEntityRoute } from './helpers';
import { TOOLBAR_STYLES } from './styles';

const EntityTableToolbar = ({
  classes,
  showAction,
  entityType,
  selectedIds,
  deleteSelectedEntities,
}) => (
  <Box py={2}>
    <Toolbar>
      <Box className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {ENTITY_TABLE_TITLE_MAP[entityType]}
        </Typography>
        {selectedIds.length > 0 && (
          <Typography color="inherit" variant="subtitle1">
            {selectedIds.length} selected
          </Typography>
        )}
      </Box>
      <Box className={classes.spacer} />
      {showAction && (
        <Box className={classes.actions}>
          {selectedIds.length > 0 ? (
            <Button
              color="secondary"
              variant="contained"
              aria-label="Add"
              onClick={() => deleteSelectedEntities({ selectedIds })}
            >
              {ENTITY_TABLE_DELETE_LABEL_MAP[entityType]}
            </Button>
          ) : (
            <Tooltip title="Add">
              <Link
                to={getCreateEntityRoute(entityType)}
                style={{ textDecoration: 'none' }}
              >
                <Button color="primary" variant="contained" aria-label="Add">
                  {ENTITY_TABLE_ADD_LABEL_MAP[entityType]}
                </Button>
              </Link>
            </Tooltip>
          )}
        </Box>
      )}
    </Toolbar>
  </Box>
);

EntityTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  showAction: PropTypes.bool,
  entityType: PropTypes.string.isRequired,
  filterParams: PropTypes.array,
  filterSchema: PropTypes.object,
  selectedIds: PropTypes.array.isRequired,
  updateFilterQuery: PropTypes.func.isRequired,
};

export default withStyles(TOOLBAR_STYLES)(EntityTableToolbar);
