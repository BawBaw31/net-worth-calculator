<script lang="ts">
  import { onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { currentUser } from "../stores";

  interface Item {
    id: number;
    title: string;
    description: string;
    price: number;
    user: any;
    user_id: number;
  }

  let items: Writable<Item[]> = writable([]);

  onMount(async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${$currentUser.token}`,
      },
    });
    const data = await res.json();
    console.log(data);

    data.forEach((item: Item) => {
      items.update((value) => [...value, item]);
    });
  });
</script>

<div>
  {#each $items as item}
    <h2>{item.title} : {item.id}</h2>
    <h3>{item.price}</h3>
    <p>{item.description}</p>
  {/each}
</div>

<style>
</style>
