import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import EntityTableToolbar from './EntityTableToolbar';
import EntityTableHead from './EntityTableHead';
import {
  INITIAL_ORDER,
  INITIAL_PAGE,
  INITIAL_ROWS_PER_PAGE,
  ROWS_PER_PAGE_OPTIONS,
} from './constants';
import { cellAlignment, getEditEntityRoute } from './helpers';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const EntityTable = ({
  entityType,
  columns,
  showAction,
  dataSource,
  needRefresh,
  totalCount,
  classes,
  fetchData,
  deleteSelectedEntity,
  deleteSelectedEntities,
}) => {
  const [order, setOrder] = useState(INITIAL_ORDER);
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_ROWS_PER_PAGE);
  const [filterQuery, setFilterQuery] = useState({});
  const prevNeedRefresh = usePrevious(needRefresh);
  const prevOrder = usePrevious(order);
  const prevOrderBy = usePrevious(orderBy);
  const prevPage = usePrevious(page);
  const prevRowsPerPage = usePrevious(rowsPerPage);
  const prevFilterQuery = usePrevious(filterQuery);
  const fetchDataSource = () =>
    fetchData({ order, orderBy, page, limit: rowsPerPage, ...filterQuery });
  const updateFilterQuery = (query) => setFilterQuery(query);
  const handleRequestSort = (event, property) => {
    const newOrderBy = property;
    const newOrder = orderBy === property && order === 'desc' ? 'asc' : 'desc';

    setOrderBy(newOrderBy);
    setOrder(newOrder);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      return setSelected(
        dataSource.filter((row) => !row.isDeleteDisabled).map((row) => row._id),
      );
    }

    return setSelected([]);
  };
  const handleRowClick = (_id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  const handleChangePage = (event, page) => setPage(page); // eslint-disable-line
  const handleChangeRowsPerPage = (event) => setRowsPerPage(event.target.value);
  const isSelected = (_id) => selected.includes(_id);

  useEffect(() => {
    if (
      (!prevNeedRefresh && needRefresh) ||
      prevOrder !== order ||
      prevOrderBy !== orderBy ||
      prevPage !== page ||
      prevRowsPerPage !== rowsPerPage ||
      prevFilterQuery !== filterQuery
    ) {
      fetchDataSource();
    }
  });

  return (
    <Paper className={classes.root}>
      <EntityTableToolbar
        entityType={entityType}
        showAction={showAction}
        selectedIds={selected}
        updateFilterQuery={updateFilterQuery}
        deleteSelectedEntities={(...args) => {
          deleteSelectedEntities(...args);
          setSelected([]);
        }}
      />
      <Box className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <EntityTableHead
            columns={columns}
            showAction={showAction}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={dataSource.length}
          />
          <TableBody>
            {dataSource.map((row) => {
              const isSelectedRow = isSelected(row._id);
              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isSelectedRow}
                  tabIndex={-1}
                  key={row._id}
                  selected={isSelectedRow}
                >
                  {showAction && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        disabled={row.isDeleteDisabled}
                        checked={isSelectedRow}
                        onClick={() => handleRowClick(row._id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      padding={column.disablePadding ? 'none' : 'default'}
                      key={column.id}
                      align={cellAlignment(column.numeric)}
                    >
                      <Link
                        to={getEditEntityRoute(entityType, row._id)}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {row[column.id]}
                      </Link>
                    </TableCell>
                  ))}
                  <TableCell padding="default">
                    {!row.isDeleteDisabled && showAction && (
                      <Link to={getEditEntityRoute(entityType, row._id)}>
                        <IconButton aria-label="Edit">
                          <EditIcon />
                        </IconButton>
                      </Link>
                    )}
                    {!showAction && (
                      <Link to={getEditEntityRoute(entityType, row._id)}>
                        <IconButton aria-label="Edit">
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                    )}
                    {!row.isDeleteDisabled && showAction && (
                      <IconButton
                        aria-label="Delete"
                        onClick={() => {
                          deleteSelectedEntity({ _id: row._id });
                          setSelected([]);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

EntityTable.propTypes = {
  loading: PropTypes.bool,
  entityType: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  showAction: PropTypes.bool,
  dataSource: PropTypes.array,
  needRefresh: PropTypes.bool.isRequired,
  totalCount: PropTypes.number,
  classes: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  deleteSelectedEntity: PropTypes.func.isRequired,
  deleteSelectedEntities: PropTypes.func.isRequired,
};

EntityTable.defaultProps = {
  loading: false,
  dataSource: [],
  totalCount: 0,
};

export default EntityTable;
