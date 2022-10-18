<script>
  import { currentUser } from "./auth";
  import Home from "./pages/Login.svelte";
  import MyItems from "./pages/Main.svelte";
</script>

<main>
  {#if $currentUser != null}
    <MyItems />
  {:else}
    <Home />
  {/if}
</main>
