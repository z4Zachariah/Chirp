import * as actionType from '../constants/actionTypes';

//This is the reducer for the Auth actions (Logging in and out)
//They observe the initial state of the application and change it based on the action passed to it
//If the user logs in, the reducer stores thier profile data locally in-browser,
//when they log out, it will clear the local storage of thier data, thus ending the session
//Because this deducer is using a switch statement for the action type, only one reducer is needed for both actions

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
