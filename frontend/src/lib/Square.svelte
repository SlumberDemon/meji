<!-- render board in wa that difficulity can be changed easily later in update-->

<script>
  export let square;

  $: displayClass = square ? "" : "visibility: hidden;";

  let numSelect = false;

  function openNum() {
    numSelect = true;
  }

  function closeNum() {
    numSelect = false;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="bg-bg2 lg:m-1 select-none lg:p-4 text-center font-thin rounded-md lg:text-2xl hover:bg-bg3 cursor-pointer text-tertiary md:m-1 md:text-2xl md:p-2"
  on:click={() => openNum()}
>
  <div style={displayClass}>
    {square}
  </div>
</div>

{#if numSelect}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="modal-overlay fixed inset-0 bg-black opacity-75 backdrop-blur-md"
    on:click={() => closeNum()}
  />
  <div class="absolute align-top">
    <div
      class="text-2xl bg-bg3 rounded-md flex flex-row p-1 items-center font-thin gap-2 drop-shadow-md z-10"
    >
      <div class="p-2 hover:scale-110 cursor-pointer">1</div>
      <div class="p-2 hover:scale-110 cursor-pointer">2</div>
      <div class="p-2 hover:scale-110 cursor-pointer">3</div>
      <div class="p-2 hover:scale-110 cursor-pointer">4</div>
      <div class="p-2 hover:scale-110 cursor-pointer">5</div>
      <div class="p-2 hover:scale-110 cursor-pointer">6</div>
      <div class="p-2 hover:scale-110 cursor-pointer">7</div>
      <div class="p-2 hover:scale-110 cursor-pointer">8</div>
      <div class="p-2 hover:scale-110 cursor-pointer">9</div>
    </div>
  </div>
{/if}
