import { ADD_BOOK } from "../constants/action-types";
import { REGISTER_USER } from "../constants/action-types";

const initialState = {
  books: [],
  articles:[],
  registeredUsers:[],
};
// function rootReducer(state = initialState, action) {
//   if (action.type === ADD_BOOK) {
//     state.books.push(action.payload);
//   }
//   return state;
// }
function rootReducer(state = initialState, action) {
    if (action.type === ADD_BOOK) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        books: state.books.concat(action.payload)
      });
    }
    if (action.type === REGISTER_USER) {
      console.log("processing in reducer")
      return Object.assign({}, state, {
        registeredUsers: state.registeredUsers.concat(action.payload)
      });
    }
    return state;
  }
  
export default rootReducer;