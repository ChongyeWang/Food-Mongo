
import { REGISTER_USER } from "../constants/action-types";


export function registerUser(payload) {
  console.log("dispatching the action")
  return { type: REGISTER_USER, payload };
}