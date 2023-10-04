<!-- render board in wa that difficulity can be changed easily later in update-->

<script>
  import { Base } from "deta";

  export let x;
  export let y;
  export let z;
  export let board;

  $: displayClass = y ? "" : "visibility: hidden;";

  let numSelect = false;

  function openNum() {
    numSelect = true;
  }

  function closeNum() {
    numSelect = false;
  }

  async function updateNum(number) {
    const state = Base("state");

    const i = board.indexOf(x);

    y = number;
    board[i][z] = y;

    await state.put({ value: board, key: "board" });

    closeNum();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  class="bg-bg2 lg:m-1 lg:p-4 text-center md:font-thin lg:font-thin rounded-md lg:text-2xl hover:bg-bg3 cursor-pointer text-tertiary md:m-1 md:text-2xl md:p-2 z-0 p-2 text-sm m-0.5 lg:w-16 md:w-12 w-8"
  on:click={() => openNum()}
>
  <div style={displayClass}>
    {y}
  </div>
</div>

{#if numSelect}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed inset-0 bg-black opacity-20 backdrop-blur-md z-10"
    on:click={() => closeNum()}
  />
  <div class="absolute align-top z-20">
    <div
      class="lg:text-2xl bg-bg3 rounded-md flex p-4 items-center font-thin lg:gap-2 drop-shadow-md md:text-1xl lg:flex-row md:flex-col flex-col gap-1 md:p-4 lg:p-1"
    >
      {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as number}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="lg:p-2 hover:scale-110 cursor-pointer text-secondary md:p-1"
          on:click={() => updateNum(number)}
        >
          {number}
        </div>
      {/each}
    </div>
  </div>
{/if}
