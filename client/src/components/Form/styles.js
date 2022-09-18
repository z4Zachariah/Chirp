
import { makeStyles } from '@material-ui/core/styles';

//Styles for the Form component

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    margin: '10px 10px',
    padding: '10px',
    backgroundColor: 'grey',
    display: 'justify-content',
    borderRadius: '10px',
    width: '100%',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  buttonlocate: {
      borderRadius: '10px',
      height: '100%',
      padding: '15px',
      marginBottom: 10,

  },
}));
