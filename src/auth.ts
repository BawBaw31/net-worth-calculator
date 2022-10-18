import { writable, type Writable } from "svelte/store";

interface User {
  username: string;
  email: string;
  token: string;
}

let _user = localStorage.getItem("user");

export const currentUser: Writable<User> = writable(
  _user ? JSON.parse(_user) : null
);

currentUser.subscribe((value) => {
  if (value) localStorage.setItem("user", JSON.stringify(value));
  else localStorage.removeItem("user"); // for logout
});
