export default (theme) => ({
  card: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  cardHeader: {
    textAligh: 'center',
  },
  cardContent: {
    padding: theme.spacing(2),
    width: '100%',
    height: '100%',
  },
  backLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  textField: {
    display: 'block',
  },
  datePicker: {
    display: 'block',
    '& .MuiInput-formControl': {
      width: '100%',
    }
  },
  readOnly: {
    '& .MuiInput-formControl::before': {
      display: 'none',
    },
    '& .MuiInput-formControl::after': {
      display: 'none',
    },
    '& .MuiInputAdornment-root': {
      display: 'none',
    },
  },
  editable: {
    '& .MuiInput-formControl::before': {
      display: 'block',
    },
    '& .MuiInput-formControl::after': {
      display: 'block',
    },
  },
  select: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: '100%',
    display: 'block',
  },
  errorControl: {
    color: theme.palette.error.main,
  },
});
