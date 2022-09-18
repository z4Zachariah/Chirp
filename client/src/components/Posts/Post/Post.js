import React, { useState, useEffect } from 'react';
import { Card, CardActions, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import ChirpAltImage from '../../../images/ChirpAltImage.jpg';
import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';


//This component is the template for how each post is displayed upon the Home page/component individually.
//When it is read in the home component, a collection of these Post components are populated with Post data from 
//The database and fed into instances. These instances display a tumbnail background, title, post timeframe, creator name,
//and selectable icons which are displayed dynamically to the Post's owner which will allow them to Edit or delete thier post.
//A like button allows any user to like a post once by feeding thier ID into a 'like array' to tell if they have liked that post already.
//The component is wrapped in a Button Base which will direct the user to the PostDetails component/page if the Post itself is clicked.

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId =   user?.result?._id ;

//|| user?.result.googleId


//handle if user has liked post already
  const haslikedPost = () => {
    
    if(likes){
      likes.find((like) => like === userId)
    }
    else{
      return false;
    }
    
    };

//like a post
  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (haslikedPost) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  //display likes button as a dynamic component
  const Likes = () => {
    if (post.likes) {
      return post.likes.find((like) => like === userId)
        ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length} </>

        ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length > 1 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} likes${post.likes.length > 1 ? 's' : ''}` }</>

        );
    }

    return <><ThumbUpAltOutlined fontSize="small" /></>;
  };

  //open the post page for this post
  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >



        <CardMedia className={classes.media} image={post.selectedFile || ChirpAltImage } title={post.title} />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
          <Typography variant="body2" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </div>


        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div className={classes.overlay2} name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <EditIcon fontSize="default" />
          </Button>
        </div>
        )}
 
      </ButtonBase>


      <CardActions className={classes.cardActions}>

        <Button size="small"  disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>

        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color='primary'  onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp;
          </Button>
        )}
      </CardActions>

    </Card>
  );
};

export default Post;
