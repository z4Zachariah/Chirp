import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import chirpLogo from '../../images/ChirpLogo.png';
import chirptext from '../../images/ChirpText.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

//This is the Navbar component, which is static at the top of the platform. It will display
//the logo as an image tag and allow a user to navigate to the signin/signup page or to log them out dynamically
//Thier name/username is alsp displayed here

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();


  // log user out
  const logout = () => {

    console.log('logging out');
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
    console.log('logged out');

  };//end of logout function

  //navigate to login page
  const signin = () => {
    history.push('/auth');

  }

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
      <img className={classes.image} src={chirpLogo} alt="icon" height="150px" />

        <img component={Link} to="/" src={chirptext} alt="icon" height="120px" />
      </Link>
      
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar color="secondary" alt={user?.result.name}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button  variant="contained" color="secondary" onClick={logout}>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
