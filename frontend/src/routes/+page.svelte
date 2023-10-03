<script>
  import { Base } from "deta";
  import Tips from "../lib/Tips.svelte";
  import Square from "../lib/Square.svelte";
  import Settings from "../lib/Settings.svelte";

  const state = Base("state");

  /** @type {import('./$types').PageData} */
  export let data;

  async function newBoard() {
    await state.delete("board");
    await state.delete("difficulty");
    await state.delete("size");
    await state.delete("height");
    await state.delete("width");
    fetch(`/board/create`);
  }

  //$: {if (data && data.board) {tips = true; }}

  $: tips = data.tip;
</script>

<svelte:head>
  <title>Meji</title>
</svelte:head>

<Settings />

<div
  class="flex justify-center items-center m-2 md:m-4 lg:m-4 flex-col select-none"
>
  <div>
    <div class="items-center flex flex-row justify-between">
      <div>
        <div class="text-brand text-5xl font-bold">Meji</div>
        <div class="text-primary text-2xl">Play Sudoku</div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="text-secondary text-2xl p-2 bg-bg2 rounded-md hover:bg-bg3 cursor-pointer"
        on:click={() => newBoard()}
      >
        New Game
      </div>
    </div>

    <div class="grid grid-cols-9 my-4">
      {#each data.board as i}
        {#each i as j}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div>
            <Square board={data.board} x={i} y={j} />
          </div>
        {/each}
      {/each}
    </div>
  </div>
  {#if tips}
    <Tips />
  {/if}
</div>
