
import { REGISTER_USER, USER_PROFILE, USER_PROFILE2} from "../constants/action-types";
import { LOGIN_USER , RESTAURANT_PAGE, RESTAURANT_PAGE2, MESSAGE_1} from "../constants/action-types";

const initialState = {

  registeredUsers:[],
  loginedUsers:[],
  userProfile: [],
  userProfile2: [],
  restaurantPage: [],
  restaurantPage2: [],
  message1: []
};
// function rootReducer(state = initialState, action) {
//   if (action.type === ADD_BOOK) {
//     state.books.push(action.payload);
//   }
//   return state;
// }
function rootReducer(state = initialState, action) {

    if (action.type === REGISTER_USER) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        registeredUsers: state.registeredUsers.concat(action.payload)
      });
    }

    if (action.type === LOGIN_USER) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        loginedUsers: state.loginedUsers.concat(action.payload)
      });
    }

    if (action.type === USER_PROFILE) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        userProfile: state.userProfile.concat(action.payload)
      });
    }

    if (action.type === USER_PROFILE2) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        userProfile2: state.userProfile2.concat(action.payload)
      });
    }

    if (action.type === RESTAURANT_PAGE) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        restaurantPage: state.restaurantPage.concat(action.payload)
      });
    }

    if (action.type === RESTAURANT_PAGE2) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        restaurantPage2: state.restaurantPage2.concat(action.payload)
      });
    }

    if (action.type === MESSAGE_1) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        message1: state.message1.concat(action.payload)
      });
    }
    return state;
  }
  
export default rootReducer;