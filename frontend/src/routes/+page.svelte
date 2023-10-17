<script>
  import { Base } from "deta";
  import Tips from "../lib/Tips.svelte";
  import { blur } from "svelte/transition";
  import Square from "../lib/Square.svelte";
  import Settings from "../lib/Settings.svelte";

  const stats = Base("stats");
  const sets = Base("settings");

  let solveCheck;
  let solvedVar;
  let solving = false;
  let solveShow;

  let tipTip;

  /** @type {import('./$types').PageData} */
  export let data;

  async function solveBoard() {
    solving = true;

    const r = await fetch(`/board/validate`).then((res) => res.json());

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

  function newBoard() {
    fetch(`/board/create`);
    window.location.reload();
  }

  async function begin() {
    await sets.put({ value: false }, "pop");
    fetch(`/board/create`);
    window.location.reload();
  }

  async function sqrTrig() {
    if (data.tip) {
      const r = await fetch(`/board/tip`).then((res) => res.json());
      tipTip = r.tip;
    }
    containsNull(data.board);
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
          New Board
        </div>
        <div class="flex flex-row gap-2 md:text-xl text-sm">
          <div class="text-quaternary font-thin uppercase">Solved</div>
          <div class="text-tertiary font-bold">{data.solved}</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-9 my-4">
      {#each data.board as x}
        <div class="col">
          {#each x as y, z}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="square" on:click={() => sqrTrig()}>
              <Square board={data.board} {x} {y} {z} />
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
  {#if tips}
    {#if !solve}
      <Tips tip={tipTip} />
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
        class="z-20 absolute bg-bg p-8 rounded-md items-center flex flex-col drop-shadow-md"
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
            New Board
          </div>
        </div>
      </div>
    {:else if solved == false}
      <div class="fixed inset-0 bg-black opacity-20 backdrop-blur-md z-10" />
      <div
        class="z-20 absolute bg-bg p-8 rounded-md items-center flex flex-col drop-shadow-md"
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

  {#if data.pop}
    <div class="fixed inset-0 bg-black opacity-20 backdrop-blur-md z-10" />
    <div
      class="z-20 absolute bg-bg p-4 rounded-md flex flex-col drop-shadow-md m-4"
      in:blur
    >
      <div
        class="lg:text-3xl md:text-2xl text-xl flex-row flex gap-2 text-primary"
      >
        Welcome to <div class="text-brand font-bold">Meji</div>
      </div>
      <div class="lg:text-xl text-sm text-secondary md:text-lg">
        If you haven't played sudoko before learn how to play [<a
          class="text-quaternary"
          href="https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/"
          >here</a
        >]
      </div>
      <div class="mt-2">
        <div class="lg:text-2xl text-primary text-xl">Twists</div>
        <div class="text-secondary lg:text-xl text-sm md:text-lg">
          Meji uses ᖘ̸̤̐͝ꍏ̴̗̼̩̀͌̒꓄̷̠͈̞̑̇ꌚ̸̈͝ to encourage/correct players
        </div>
      </div>
      <div class="text-quaternary text-xs mt-2">
        (⚠️ Try reloading if the board is empty ⚠️)
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="text-secondary md:text-2xl md:p-2 bg-bg2 rounded-md hover:bg-bg3 cursor-pointer text-sm p-2 mt-4 text-center"
        on:click={() => begin()}
      >
        Begin
      </div>
    </div>
  {/if}
</div>

<style>
  /* Add borders between squares to divide the 9x9 grid into 3x3 subgrids */
  .square {
    border: 0.5px solid transparent;
  }
  .square:nth-child(3),
  .square:nth-child(6) {
    border-bottom: 0.5px solid hsl(var(--twc-quaternary));
  }
  .square:nth-child(4),
  .square:nth-child(7) {
    border-top: 0.5px solid hsl(var(--twc-quaternary));
  }
  .col:nth-child(3) .square,
  .col:nth-child(6) .square {
    border-right: 0.5px solid hsl(var(--twc-quaternary));
  }
  .col:nth-child(4) .square,
  .col:nth-child(7) .square {
    border-left: 0.5px solid hsl(var(--twc-quaternary));
  }
</style>
