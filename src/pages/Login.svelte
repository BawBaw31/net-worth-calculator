<script lang="ts">
  import { writable, type Writable } from "svelte/store";
  import CustomButton from "../lib/CustomButton.svelte";
  import LoginForm from "../lib/LoginForm.svelte";
  import RegisterForm from "../lib/RegisterForm.svelte";

  let login: Writable<boolean> = writable(true);
</script>

<div class="pageContainer">
  <div class="leftContainer" />
  <div class="rightContainer">
    <h1>Welcome to Net-Worth Calculator</h1>

    <div class="card">
      <div class="card-header-container">
        <h2>{login ? "Login" : "Register"}</h2>
        <CustomButton
          on:click={() => ($login = !$login)}
          btnStyle="secondary"
          btnSize="small"
          text={$login ? "Register" : "Login"}
        />
      </div>
      {#if $login}
        <LoginForm />
      {:else}
        <RegisterForm bind:login={$login} />
      {/if}
    </div>
  </div>
</div>

<style>
  .pageContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .rightContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;
  }

  .leftContainer {
    background-color: var(--primary);
    height: 200%;
  }

  .card-header-container {
    display: flex;
    align-items: center;
  }

  h1 {
    text-align: left;
  }

  h2 {
    margin-right: 1rem;
  }
</style>
