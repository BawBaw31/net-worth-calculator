import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";
import MyItems from "./pages/MyItems.svelte";
import { currentUser } from "./stores";

let user;
currentUser.subscribe((value) => (user = value));

export const routes = user.token
  ? {
      "/items": MyItems,
      "*": NotFound,
    }
  : {
      "/": Home,
      "*": NotFound,
    };
