import { writable, type Writable } from "svelte/store";

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
}

export const items: Writable<Item[]> = writable([]);