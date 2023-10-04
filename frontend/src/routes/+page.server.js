// find way to fix board not being created when empty

import { Base } from "deta";

export async function load({ fetch }) {
  const settings = Base("settings");
  const state = Base("state");
  const stats = Base("stats");

  const board = await state.get("board");
  // const difficulty = await state.get("difficulty");
  const size = await state.get("size");
  const tip = await settings.get("tip");
  const solved = await stats.get("solved");

  let r;

  // move to +page.svelte in onMount

  if (!board || !solved) {
    // await stats.put({value: 0, key: "solved"})
    r = await fetch(`/board/create`).then((res) => res.json());
  }

  return {
    size: size.value,
    board: board.value || r.board,
    tip: tip.value,
  };
}
