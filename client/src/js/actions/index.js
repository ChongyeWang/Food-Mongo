
import { REGISTER_USER } from "../constants/action-types";
import { LOGIN_USER } from "../constants/action-types";
import { USER_PROFILE } from "../constants/action-types";
import { USER_PROFILE2 } from "../constants/action-types";
import { RESTAURANT_PAGE } from "../constants/action-types";
import { RESTAURANT_PAGE2 } from "../constants/action-types";
import { MESSAGE_1 } from "../constants/action-types";

export function registerUser(payload) {
  console.log("dispatching the action")
  return { type: REGISTER_USER, payload };
}

export function loginUser(payload) {
  console.log("dispatching the action")
  return { type: LOGIN_USER, payload };
}


export function userProfile(payload) {
  console.log("dispatching the action")
  return { type: USER_PROFILE, payload };
}

export function userProfile2(payload) {
  console.log("dispatching the action")
  return { type: USER_PROFILE2, payload };
}

export function restaurantPage(payload) {
  console.log("dispatching the action")
  return { type: RESTAURANT_PAGE, payload };
}

export function restaurantPage2(payload) {
  console.log("dispatching the action")
  return { type: RESTAURANT_PAGE2, payload };
}

export function message1(payload) {
  console.log("dispatching the action")
  return { type: MESSAGE_1, payload };
}