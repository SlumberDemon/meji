// find way to fix board not being created when empty

import { Base } from "deta";

export async function load({ fetch }) {
  const data = Base("state");

  const board = await data.get("board");
  const difficulty = await data.get("difficulty");
  const size = await data.get("size");

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
