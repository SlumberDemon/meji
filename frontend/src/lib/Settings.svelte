<!-- Center the settings menu in the middle of screen?-->

<script>
  import { Base } from "deta";
  import { onMount } from "svelte";

  const settings = Base("settings");

  async function updateTip() {
    const newState = await stateTip();
    settings.put({ value: !newState }, "tip");
    closeSet();
    window.location.reload();
  }

  async function stateTip() {
    const currentState = await settings.get("tip");
    return currentState.value;
  }

  let tipState;
  let settingsState = false;

  async function openSet() {
    const currentState = await settings.get("tip");
    tipState = currentState.value;
    settingsState = true;
  }

  function closeSet() {
    settingsState = false;
  }

  onMount(async () => {
    const currentState = await settings.get("tip");
    tipState = currentState.value;
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="flex flex-row m-1 justify-end fixed bottom-0 right-0 cursor-pointer bg-bg2 rounded-md p-1 hover:bg-bg3 items-center"
  on:click={() => openSet()}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon icon-tabler icon-tabler-adjustments-horizontal stroke-secondary lg:h-10 lg:w-10 md:w-8 md:h-8 h-6 w-6"
    width="60"
    height="60"
    viewBox="0 0 24 24"
    stroke-width="1"
    stroke="#000000"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M14 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M4 6l8 0" />
    <path d="M16 6l4 0" />
    <path d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M4 12l2 0" />
    <path d="M10 12l10 0" />
    <path d="M17 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M4 18l11 0" />
    <path d="M19 18l1 0" />
  </svg>
</div>

{#if settingsState}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 bg-black opacity-20 backdrop-blur-md z-10"
    on:click={() => closeSet()}
  />
  <div class="align-top z-20 fixed bottom-14 right-0 m-1 bg-bg3 p-2 rounded-md">
    <div class="items-center flex-row flex text-secondary gap-6">
      Tips
      <!-- svelte-ignore a11y-click-events-have-key-events-->
      <div
        class="p-2 bg-bg2 rounded-full border-brand border-spacing-2 cursor-pointer"
        class:border-2={tipState}
        on:click={() => updateTip()}
      />
    </div>
  </div>
{/if}
