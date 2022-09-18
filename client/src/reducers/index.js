import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';

//This file simply combines the Auth and Posts reducers into one location for importing

export const reducers = combineReducers({ posts, auth });
