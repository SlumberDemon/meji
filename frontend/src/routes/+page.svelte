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
  let solving = false;
  let solveShow;

  /** @type {import('./$types').PageData} */
  export let data;

  async function solveBoard() {
    solving = true;

    let r;

    r = await fetch(`/board/validate`).then((res) => res.json());

    solvedVar = r.validate;
    if (r.validate) {
      await stats.update({ value: stats.util.increment(1) }, "solved");
      solveShow = true;
    }
    solving = false;
  }

  function tryAgain() {
    solveShow = false;
    solvedVar = null;
  }

  async function newBoard() {
    await state.delete("board");
    await state.delete("difficulty");
    await state.delete("size");
    await state.delete("height");
    await state.delete("width");
    fetch(`/board/create`);
    window.location.reload();
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
  $: showSolve = !solveShow;
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
          <div class="text-tertiary font-bold">{data.solved}</div>
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
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if showSolve}
      <div
        class="text-secondary md:text-2xl md:p-2 bg-bg2 rounded-md hover:bg-bg3 cursor-pointer text-sm p-2 mx-2"
        in:blur
        on:click={() => solveBoard()}
      >
        {#if solving}
          <svg
            class="animate-spin h-4 w-4 inherit text-brand"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            ><circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            /><path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            /></svg
          >
        {:else}
          Solve
        {/if}
      </div>
    {/if}
    {#if solved == true}
      <div class="fixed inset-0 bg-black opacity-20 backdrop-blur-md z-10" />
      <div
        class="z-20 absolute bg-bg p-8 rounded-md items-center flex flex-col"
        in:blur
      >
        <div class="text-5xl text-brand font-thin uppercase">Solved</div>
        <div class="text-3xl text-secondary mt-2 flex-row flex items-center">
          {data.solved}
          <div class="text-quaternary">+1</div>
          <!--<div>00:00</div> time taken-->
        </div>
        <div class="flex-row flex mt-6">
          <!--<div>Share</div>-->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="text-secondary md:text-2xl md:p-2 bg-bg2 rounded-md hover:bg-bg3 cursor-pointer text-sm p-2"
            on:click={() => newBoard()}
          >
            New Game
          </div>
        </div>
      </div>
    {:else if solved == false}
      <div class="fixed inset-0 bg-black opacity-20 backdrop-blur-md z-10" />
      <div
        class="z-20 absolute bg-bg p-8 rounded-md items-center flex flex-col"
        in:blur
      >
        <div class="text-5xl text-brand font-thin uppercase">Not Solved</div>
        <div class="flex-row flex mt-6">
          <!--<div>Share</div>-->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="text-secondary md:text-2xl md:p-2 bg-bg2 rounded-md hover:bg-bg3 cursor-pointer text-sm p-2"
            on:click={() => tryAgain()}
          >
            Try again
          </div>
        </div>
      </div>
    {/if}
  {/if}
</div>
