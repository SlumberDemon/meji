<!-- render board in wa that difficulity can be changed easily later in update-->

<script>
  export let square;

  let selectedNum = 1;

  $: displayClass = square ? "" : "visibility: hidden;";

  let numSelect = false;

  function openNum() {
    numSelect = true;
  }

  function closeNum() {
    numSelect = false;
  }

  function updateNum(number) {
    square = number;
    closeNum();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="bg-bg2 lg:m-1 lg:p-4 text-center md:font-thin lg:font-thin rounded-md lg:text-2xl hover:bg-bg3 cursor-pointer text-tertiary md:m-1 md:text-2xl md:p-2 z-0 p-2 text-sm m-0.5"
  on:click={() => openNum()}
>
  <div style={displayClass}>
    {square}
  </div>
</div>

<!-- find way to either center it on the grid or make it pop up over the selected square-->
{#if numSelect}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 bg-black opacity-20 backdrop-blur-md z-10"
    on:click={() => closeNum()}
  />
  <div class="absolute align-top z-20">
    <div
      class="text-2xl bg-bg3 rounded-md flex flex-row p-1 items-center font-thin gap-2 drop-shadow-md"
    >
      {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as number}
        <!-- -<input type="radio" name="selectedNum" value={number} bind:group={selectedNum} /> -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="p-2 hover:scale-110 cursor-pointer"
          on:click={() => updateNum(number)}
        >
          {number}
        </div>
      {/each}
    </div>
  </div>
{/if}
