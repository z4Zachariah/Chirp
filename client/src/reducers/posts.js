import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

//This is the reducer for the Post actions
//It will return the state depending upon the action type submitted to it
//The behaviours it will respond to include: Fetching all posts, Fetching via search/Creator, Fetching a single post, Create a post,
//Update a post, Delete a post, Like a post, and Comment on a post.
//Each of these action types will update the state in a specific dynamic way

export default (state = { isLoading: true, posts: [] }, action) => {

  switch (action.type) {

    case 'START_LOADING':
      return { ...state, isLoading: true };

    case 'END_LOADING':
      return { ...state, isLoading: false };

    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };

    case FETCH_BY_SEARCH:
    case FETCH_BY_CREATOR:
      return { ...state, posts: action.payload.data };

    case FETCH_POST:
      return { ...state, post: action.payload.post };

    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === +action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };

    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };

    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };

    default:
      return state;
  }
};

