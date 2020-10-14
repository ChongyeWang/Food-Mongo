import { ADD_BOOK} from "../constants/action-types";
import { REGISTER_USER } from "../constants/action-types";

export function addBook(payload) {
  console.log("dispatching the action")
  return { type: ADD_BOOK, payload };
}

export function registerUser(payload) {
  console.log("dispatching the action")
  return { type: REGISTER_USER, payload };
}