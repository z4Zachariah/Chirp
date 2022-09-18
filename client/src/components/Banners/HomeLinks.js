import React, { useState } from 'react';
import { Container, Grid, Typography, Paper } from '@material-ui/core';
import useStyles from './styles';
import FBlogo from '../../images/FBlogo.jpg';
import DOC from '../../images/DOC.jpg';


//These are reactive link cards/images displayed on the Posts/homepage
//They lead to the Forest and Bird and the Department of Conservation pages respectively

const HomeLinks = () => {
  const classes = useStyles();


  return (
    <Container style={{padding:'50px'}}>

      <Paper style={{padding:'30px', backgroundColor: '#E9F7EF'}}>

        <Typography variant="h6" color='primary'>Want to make a difference?</Typography>

      
        <Grid container spacing={2} alignContent='centre'>

          <Grid item xs={12} md={6}>
            <a href="https://www.forestandbird.org.nz/" target="_blank" rel="noreferrer">
              <img src={FBlogo} alt="Forest and Bird" width="100%" />
            </a>
          </Grid>


          <Grid item xs={12} md={6}>
            <a href="https://www.doc.govt.nz/" target="_blank" rel="noreferrer">
              <img src={DOC} alt="DOC" width="100%"/>
            </a>
          </Grid>
        
        </Grid>

      </Paper>

    </Container>
    
  );
};

export default HomeLinks;
