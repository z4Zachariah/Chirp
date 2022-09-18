import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Typography, CircularProgress, Grid, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import Post from "../Posts/Post/Post";
import { getPostsByCreator, getPostsBySearch } from "../../actions/posts";

//This component is a direct copy of the Home/Posts component and simply returns all posts provided by the search query;
//in this case, if a user wants to see all posts by another user, or all posts containing a specific tag

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/tags")) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, []);

  if (!posts.length && !isLoading) return "No posts";

  return (
    <div>
      <Typography variant="h2">{name}</Typography>
      <Divider style={{ margin: "20px 0 50px 0" }} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
