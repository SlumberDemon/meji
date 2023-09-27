<script>
  import Square from "../lib/Square.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  function newBoard() {
    console.log("New Board");
    // return fetch(`/board/create`).then((r) => r.json()); // set data to new board data or retrigger fetch again somehow
  }

  function numClick(i, j) {
    console.log(i);
    console.log(j);
  }
</script>

<svelte:head>
  <title>Meji</title>
</svelte:head>

<div class="flex justify-center items-center m-4 flex-col select-none">
  <div>
    <div class="items-center flex flex-row justify-between">
      <div>
        <div class="text-brand text-5xl font-bold">Meji</div>
        <div class="text-primary text-2xl">Play Sudoku</div>
      </div>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div
        class="text-secondary text-2xl p-2 bg-bg2 rounded-md hover:bg-bg3 cursor-pointer"
        on:click={newBoard}
      >
        New Game
      </div>
    </div>

    <div class="grid grid-cols-9 my-4">
      {#each data.board as i}
        {#each i as j}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div on:click={() => numClick(i, j)}>
            <Square square={j} />
          </div>
        {/each}
      {/each}
    </div>
  </div>
</div>
