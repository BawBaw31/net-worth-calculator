import { writable, type Writable } from "svelte/store";

interface User {
  username: string;
  email: string;
  token: string;
}

export const currentArtist: Writable<User> = writable();
