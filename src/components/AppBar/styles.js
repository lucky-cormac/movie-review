export default (theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  brandText: {
    fontSize: theme.typography.h4.fontSize,
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
  mainMenu: {
    display: 'flex',
  },
  menuItem: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
  menuButton: {
    marginLeft: -1 * theme.spacing(1),
    marginRight: theme.spacing(2),
    color: '#fff',
  },
  menuButtonEmail: {
    textTransform: 'none',
  },
  menuButtonName: {
    textTransform: 'capitalize',
  },
});
