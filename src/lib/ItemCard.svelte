<script lang="ts">
  import { writable, type Writable } from "svelte/store";
  import { currentUser } from "../auth";
  import type { Item } from "../items";
  import { items } from "../items";
  import CreateItemForm from "./CreateItemForm.svelte";
  import CustomButton from "./CustomButton.svelte";
  import EditItemForm from "./EditItemForm.svelte";

  export let item: Item = null;
  export let index: number = null;
  export let creating: boolean = false;

  const editing: Writable<boolean> = writable(false);

  const deleteItem = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/items/${item.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${$currentUser.token}`,
        },
      }
    );
    if (res.status === 204) {
      items.update((value) => {
        value.splice(index, 1);
        return value;
      });
    }
  };
</script>

<li class="card">
  {#if creating}
    <CreateItemForm bind:creating />
  {:else if item}
    {#if $editing}
      <EditItemForm {index} {item} bind:editing={$editing} />
    {:else}
      <div class="card-header">
        <h3>{item.title}</h3>
      </div>
      <div class="card-body">
        <p class="description">Description : {item.description}</p>
        <p>Value : {item.price} $</p>
      </div>
      <div class="card-footer">
        <CustomButton
          on:click={() => ($editing = !$editing)}
          btnStyle="secondary"
          btnSize="small"
          text="Edit"
        />
        <CustomButton
          on:click={deleteItem}
          btnStyle="red"
          btnType="submit"
          btnSize="small"
          text="Delete"
        />
      </div>
    {/if}
  {/if}
</li>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 20rem;
    min-height: 20rem;
    background-color: var(--secondary);
    padding: 0.5rem;
    margin: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--primary);
    overflow: hidden;
  }

  p.description {
    height: 9rem;
    overflow: hidden;
    text-align: justify;
  }
</style>
