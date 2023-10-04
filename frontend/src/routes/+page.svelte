<script>
  import { Base } from "deta";
  import Tips from "../lib/Tips.svelte";
  import { blur } from "svelte/transition";
  import Square from "../lib/Square.svelte";
  import Settings from "../lib/Settings.svelte";

  const state = Base("state");
  const stats = Base("stats");

  let solveCheck;
  let solvedVar;

  /** @type {import('./$types').PageData} */
  export let data;

  async function solveBoard() {
    r = await fetch(`/board/validate`).then((res) => res.json());
    console.log(r);

    solvedVar = r.validate;
    if (r.validate) {
      // await stats.update()
      // update stats "solved" +1
    }
  }

  async function newBoard() {
    await state.delete("board");
    await state.delete("difficulty");
    await state.delete("size");
    await state.delete("height");
    await state.delete("width");
    fetch(`/board/create`);
  }

  function containsNull(arr) {
    if (arr.some((subArray) => subArray.includes(null))) {
      solveCheck = true;
    } else {
      solveCheck = false;
    }
  }

  containsNull(data.board);

  $: tips = data.tip;
  $: solved = solvedVar;
  $: solve = !solveCheck;
</script>

<svelte:head>
  <title>Meji</title>
</svelte:head>

<Settings />

<div
  class="flex justify-center items-center m-2 md:m-4 lg:m-4 flex-col select-none"
>
  <div>
    <div class="items-center flex flex-row justify-between mx-1">
      <div>
        <div class="text-brand md:text-5xl font-bold text-3xl">Meji</div>
        <div class="text-primary md:text-2xl text-xl">Play Sudoku</div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="flex flex-col gap-1 items-end">
        <div
          class="text-secondary md:text-2xl md:p-2 bg-bg2 rounded-md hover:bg-bg3 cursor-pointer text-sm p-2"
          on:click={() => newBoard()}
        >
          New Game
        </div>
        <div class="flex flex-row gap-2 md:text-xl text-sm">
          <div class="text-quaternary font-thin uppercase">Solved</div>
          <div class="text-tertiary font-bold">1</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-9 my-4">
      {#each data.board as x}
        {#each x as y, z}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div on:click={() => containsNull(data.board)}>
            <Square board={data.board} {x} {y} {z} />
          </div>
        {/each}
      {/each}
    </div>
  </div>
  {#if tips}
    {#if !solve}
      <Tips />
    {/if}
  {/if}

  {#if solve}
    <div
      class="text-secondary md:text-2xl md:p-2 bg-bg2 rounded-md hover:bg-bg3 cursor-pointer text-sm p-2 mx-2"
      in:blur
    >
      Solve
    </div>

    {#if solved}
      <div>Pop up in middle, save stats</div>
      <!-- Time taken: -->
    {/if}
  {/if}
</div>
