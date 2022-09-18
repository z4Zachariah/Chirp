import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import AddLocationIcon from '@material-ui/icons/AddLocation';


import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

//This form component is the main interface for the user to create and edit new posts
//It will be displayed on the homepage, and will hold the input values for submission to the create or update action

//create value fields
const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '', location: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();
  const apiKey = "AIzaSyD_eHQtygvKJOF5Fcxk43t0bCIy_63P8dg";

  const [locationButton, setLocationbutton] = useState('Add Location');


  //clear the form
  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '', location: '' });
    setLocationbutton('Add Location')
  };


  //This location function uses JS Geolocation services and runs the resultant lat/long value into a 
  //Googlemaps reverse geocode call to return a bunch of location information I then
  //render down into it's component objects and display the main titles of at each scale - 
  //resulting in the appearance of a location finding component
  const location = () =>{

    var lat;
    var long;

    var locale = ' ';
    var city = ' ';
    var region = ' ';
    var country = ' ';

    var locationString;

    navigator.geolocation.getCurrentPosition(function(position) {

      lat = position.coords.latitude;
      long = position.coords.longitude;

     //console.log("Latitude is :", lat);
     //console.log("Longitude is :", long);

      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`;

      fetch(url)
      .then(response => response.json())
      .then(data => { 
        
        //console.log(data);

        let parts = data.results[0].address_components;
        
        parts.forEach(part => {
          if (part.types.includes("country")) {

            //console.log(`COUNTRY: ${part.long_name}`);
            country = part.long_name;
          }});

            parts.forEach(part => {
            if (part.types.includes("administrative_area_level_1")) {

              //console.log(`REGION: ${part.long_name}`);

              region = part.long_name + ', ';
            }});


            parts.forEach(part => {
              if (part.types.includes("locality")) {
  
                //console.log(`City: ${part.long_name}`);

                city = part.long_name + ', ';
              }});



              parts.forEach(part => {
                if (part.types.includes("sublocality")) {
    
                  //console.log(`Locale: ${part.long_name}`);

                  locale = part.long_name + ', ';
  
                }});

                  locationString = `${locale} ${city} ${region} ${country}`;
                  //console.log(locationString);


                  setLocationbutton(`${locale} ${city} ${region}`);
                  setPostData({ ...postData, location: locationString });

    })
    .catch(err => console.log(err.message));
    });

  };// end of location function
  


  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);


  // handle the submission of the forms contents
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to Share your own Images and messages.
        </Typography>
      </Paper>
    );
  }

  //adding a chip to the tag array
  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  //removing a chip from the tag array
  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };


  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Chirp Something!'}</Typography>
        <TextField required name="title" variant="outlined" label="Caption" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags - type and Enter"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>

        <div className={classes.fileInput} color="secondary" >
     
           <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /> 
  
        </div>

            <Button className={classes.buttonlocate} variant="contained" color="primary" size="small" onClick={location} > {locationButton} <AddLocationIcon/></Button>

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
