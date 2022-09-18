import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory, Link } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import useStyles from "./styles";
import ChirpAltImage2 from "../../images/ChirpAltImage2.jpg";

import PostLinks from "../Banners/PostLinks";

//This is the Post Details component where a user is directed to inspect more details about a specific
//post they have clicked on from the homepage. It will display all information included in a post, including
//all body text, location, and the ability to submit user comments via the comment component
//At the very bottom of this page component is a collection of Posts displayed in a reduced style that contain the same tag as the focused post
//in a 'similar posts'style
//The banner links to environmental webistes will also be displayed at the bottom of this page, named PostLinks

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => history.push(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <div>
      <Paper
        style={{
          padding: "20px",
          borderRadius: "15px",
          backgroundColor: "#263238",
        }}
        elevation={6}
      >
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">
              {post.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component="h2"
            >
              {post.tags.map((tag) => (
                <Link
                  to={`/tags/${tag}`}
                  style={{ textDecoration: "none", color: "#52BE80" }}
                >
                  {` #${tag} `}
                </Link>
              ))}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post.message}
            </Typography>
            <Typography variant="h6">
              Created by:
              <Link
                to={`/creators/${post.name}`}
                style={{ textDecoration: "none", color: "#52BE80" }}
              >
                {` ${post.name}`}
              </Link>
            </Typography>
            <Typography variant="body1">
              {post.likes.length} <ThumbUpAltIcon fontSize="small" />
            </Typography>
            <Typography variant="body1">
              {moment(post.createdAt).fromNow()}
            </Typography>

            <Typography variant="body1">{post.location}</Typography>

            <Divider style={{ margin: "20px 0" }} />

            <CommentSection post={post} />
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={classes.imageSection}>
            <img
              className={classes.media}
              src={post.selectedFile || ChirpAltImage2}
              alt={post.title}
            />
          </div>
        </div>
        {!!recommendedPosts.length && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">
              You might also like:
            </Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(
                ({ title, name, message, likes, selectedFile, _id }) => (
                  <div
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography gutterBottom variant="h6">
                      {title}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2">
                      {message}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <img src={selectedFile} width="200px" />
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </Paper>

      <PostLinks />
    </div>
  );
};

export default Post;
