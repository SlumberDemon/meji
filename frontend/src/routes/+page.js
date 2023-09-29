// find way to fix board not being created when empty

import { Base } from "deta";

export async function load({ fetch }) {
  const state = Base("state");
  const settings = Base("settings");

  const board = await state.get("board");
  const difficulty = await state.get("difficulty");
  const size = await state.get("size");

  const tip = await settings.get("tip");

  let r;

  if (!board || !difficulty) {
    r = await fetch(`/board/create`).then((res) => res.json());
  }

  return {
    size: size.value,
    board: board.value || r.board,
    tip: tip.value,
  };
}
