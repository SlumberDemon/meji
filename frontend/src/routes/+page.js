// find way to fix board not being created when empty

import { Base } from "deta";

export async function load({ fetch }) {
  const state = Base("state");

  const board = await state.get("board");
  const difficulty = await state.get("difficulty");
  const size = await state.get("size");

  let r;

  if (!board || !difficulty) {
    r = await fetch(`/board/create`).then((res) => res.json());
  }

  console.log(board.value);
  return {
    size: size,
    board: board.value || r.board,
  };
}
