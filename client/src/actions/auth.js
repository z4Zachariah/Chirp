import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

//These Actions are dispatched when called from the Auth component,
//They enable a user to sign in to an existing account or to create a new one


//Sign into account
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

//Create an account
export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};


// end of Auth actions