import { writable, derived, type Readable, type Writable } from "svelte/store";

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
}

export const items: Writable<Item[]> = writable([]);

export const totalPrice: Readable<number> = derived(
  items,
  ($items) => $items.reduce((prevItem, item) => prevItem + item.price, 0),
  0
);
