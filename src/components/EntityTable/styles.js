import { lighten } from '@material-ui/core/styles/colorManipulator';

export const TOOLBAR_STYLES = (theme) => ({
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100px',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  filter: {
    display: 'flex',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  filterControl: {
    width: 300,
    marginRight: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
  },
});

export const TABLE_STYLES = (theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});
