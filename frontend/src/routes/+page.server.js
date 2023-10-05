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

  if (!board || !solved) {
    await settings.put({ value: false, key: "tip" });
    await stats.put({ value: 0, key: "solved" });
    fetch(`/board/create`);
    window.location.reload();
  }

  return {
    size: size.value,
    board: board.value,
    tip: tip.value,
    solved: solved.value,
  };
}
