import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, green, grey } from '@material-ui/core/colors';

//This is the base App component which will be fed into the public client-facing index file.
//The components here are wapped in a browser router which will dyamically display each page/compoennt depending upon the 
//url/address navigated to by the user


//This theme constructor allows for the customisation of the color palette gloabally
const customTheme = createMuiTheme({
palette: {
  type: 'dark',
  primary: green,
  secondary: grey,
  default: blue,

}

});


const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <ThemeProvider theme={customTheme}>
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  </ThemeProvider>
  );
};

export default App;
