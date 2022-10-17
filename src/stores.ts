import type { Writable } from "svelte/store";
import { writable } from "svelte-local-storage-store";

interface User {
  username: string;
  email: string;
  token: string;
}

export const currentUser: Writable<User> = writable("user", {
  username: "",
  email: "",
  token: "",
});
