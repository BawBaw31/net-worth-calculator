<script lang="ts">
  import type { Item } from "../items";
  import CustomButton from "./CustomButton.svelte";
  import { currentUser } from "../auth";
  import { items } from "../items";

  export let item: Item;
  export let index: number;

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
  <div class="card-header">
    <h3>{item.title}</h3>
  </div>
  <div class="card-body">
    <p class="description">Description : {item.description}</p>
    <p>Value : {item.price} $</p>
  </div>
  <div class="card-footer">
    <CustomButton
      on:click={() => {}}
      btnStyle="secondary"
      btnType="submit"
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
</li>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 20rem;
    height: 20rem;
    background-color: var(--secondary);
    padding: 0.5rem;
    margin: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--primary);
  }

  .card-footer {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  p.description {
    height: 9rem;
    overflow: hidden;
    text-align: justify;
  }
</style>
