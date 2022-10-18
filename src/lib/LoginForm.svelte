<script lang="ts">
  import { createForm } from "svelte-forms-lib";
  import * as yup from "yup";
  import { currentUser } from "../auth";
  import CustomButton from "./CustomButton.svelte";

  const loginRequest = async (
    email: string,
    password: string
  ): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return response;
  };

  const { errors, touched, isValid, isSubmitting, handleChange, handleSubmit } =
    createForm({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
      }),
      onSubmit: async (values) => {
        const response = await loginRequest(values.email, values.password);
        const data = await response.json();
        currentUser.update(
          (user) =>
            (user = {
              token: data.Token,
              email: data.User.Email,
              username: data.User.Username,
            })
        );
      },
    });
</script>

<form class:valid={$isValid} on:submit={handleSubmit}>
  <div class="input-container">
    <label for="email">Email :</label>
    <input type="email" name="email" on:keyup={handleChange} />
  </div>
  {#if $errors.email && $touched.email}
    <small>{$errors.email}</small>
  {/if}

  <div class="input-container">
    <label for="password">Password :</label>
    <input type="password" name="password" on:keyup={handleChange} />
  </div>
  {#if $errors.password && $touched.password}
    <small>{$errors.password}</small>
  {/if}

  <CustomButton
    btnType="submit"
    text={$isSubmitting ? "Loading..." : "Submit"}
    btnIsDisabled={!$isValid}
  />
</form>

<style>
  small {
    align-self: flex-end;
  }
</style>
