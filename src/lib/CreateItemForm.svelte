<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { currentUser } from "../auth";
  import { items } from "../items";
  import CustomButton from "./CustomButton.svelte";

  export let creating: boolean;

  const createItemRequest = async (
    title: string,
    description: string,
    price: number | string
  ): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${$currentUser.token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        price: typeof price === "string" ? parseInt(price) : price,
      }),
    });
    return response;
  };

  const { errors, touched, isValid, isSubmitting, handleChange, handleSubmit } =
    createForm({
      initialValues: {
        title: "",
        description: "",
        price: 0,
      },
      validationSchema: yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
        price: yup.number().required(),
      }),
      onSubmit: async (values) => {
        const res = await createItemRequest(
          values.title,
          values.description,
          values.price
        );
        const data = await res.json();
        console.log(data);

        if (res.status === 201) {
          items.update((value) => {
            value.push(data);
            return value;
          });
          creating = false;
        }
      },
    });
</script>

<form class:valid={$isValid} on:submit={handleSubmit}>
  <div class="input-container">
    <label for="title">Title :</label>
    <input type="text" name="title" on:keyup={handleChange} />
  </div>
  {#if $errors.title && $touched.title}
    <small>{$errors.title}</small>
  {/if}

  <div class="input-container">
    <label for="description">Description :</label>
    <textarea name="description" on:keyup={handleChange} />
  </div>
  {#if $errors.description && $touched.description}
    <small>{$errors.description}</small>
  {/if}

  <div class="input-container">
    <label for="price">Price :</label>
    <input
      type="number"
      name="price"
      on:keyup={handleChange}
      on:change={handleChange}
    />
  </div>
  {#if $errors.price && $touched.price}
    <small>{$errors.price}</small>
  {/if}

  <div class="card-footer">
    <CustomButton
      ref="custom-button"
      on:click={() => (creating = !creating)}
      btnStyle="secondary"
      btnSize="small"
      text="Cancel"
    />

    <CustomButton
      ref="custom-button"
      btnType="submit"
      text={$isSubmitting ? "Loading..." : "Submit"}
      btnIsDisabled={!$isValid}
      btnSize="small"
    />
  </div>
</form>

<style>
  div.input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
    width: 100%;
  }

  form {
    margin-bottom: 0;
  }

  :global([ref="custom-button"]) {
    margin: 0;
    width: auto;
  }

  input,
  textarea {
    margin: 0;
    width: 90%;
  }
</style>
