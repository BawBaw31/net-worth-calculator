<script lang="ts">
  import { onMount } from "svelte";
  import { currentUser } from "../auth";
  import { items, type Item } from "../items";
  import CustomButton from "../lib/CustomButton.svelte";
  import ItemCard from "../lib/ItemCard.svelte";

  const logout = () => {
    $currentUser = null;
  };

  onMount(async () => {
    $items = [];
    const res = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${$currentUser.token}`,
      },
    });
    const data = await res.json();

    data.forEach((item: Item) => {
      items.update((value) => [...value, item]);
    });
  });
</script>

<div class="page-header">
  <CustomButton
    on:click={logout}
    btnStyle="primary"
    btnType="submit"
    btnSize="small"
    text="Logout"
  />
  <h1>{$currentUser.username} items :</h1>
</div>

{#if $items.length > 0}
  <ul class="items-container">
    {#each $items as item, i (item.id)}
      <ItemCard item={item} index={i} />
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
</style>
