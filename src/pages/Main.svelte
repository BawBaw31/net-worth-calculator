<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { writable, type Unsubscriber, type Writable } from "svelte/store";
  import { currentUser } from "../auth";
  import { items, type Item } from "../items";
  import CustomButton from "../lib/CustomButton.svelte";
  import ItemCard from "../lib/ItemCard.svelte";

  const creating: Writable<boolean> = writable(false);

  const logout = () => {
    $currentUser = null;
  };

  let total: number;

  let unsubscribe: Unsubscriber = items.subscribe((items) => {
    total = items.reduce((acc, item) => acc + item.price, 0);
  });

  onMount(async () => {
    $items = [];
    const res = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${$currentUser.token}`,
      },
    });

    if (res.status === 401) {
      $currentUser = null;
      return;
    }

    const data = await res.json();

    data.forEach((item: Item) => {
      items.update((value) => [...value, item]);
    });
  });

  onDestroy(unsubscribe);
</script>

<div class="page-header">
  <CustomButton
    on:click={logout}
    btnStyle="primary"
    btnType="submit"
    btnSize="small"
    text="Logout"
  />
  <h1>{$currentUser.username} total : {total} $</h1>
</div>

<div class="action-container">
  <CustomButton
    on:click={() => ($creating = !$creating)}
    btnStyle="primary"
    text={$creating ? "-" : "+"}
  />
  {#if $creating}
    <ItemCard bind:creating={$creating} />
  {/if}
</div>

{#if $items.length > 0}
  <ul class="items-container">
    {#each $items as item, i (item.id)}
      <ItemCard {item} index={i} />
    {/each}
  </ul>
{:else}
  <p class="no-items">No items found</p>
{/if}

<style>
  ul {
    padding: 0;
  }

  h1 {
    margin-left: 1rem;
  }

  .items-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }

  .page-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
  }

  p.no-items {
    text-align: center;
  }

  .action-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 10rem;
  }
</style>
