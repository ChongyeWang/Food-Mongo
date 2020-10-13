import { ADD_BOOK} from "../constants/action-types";
export function addBook(payload) {
  console.log("dispatching the action")
  return { type: ADD_BOOK, payload };
}