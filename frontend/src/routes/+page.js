import { Base } from "deta";

export async function load({ fetch }) {
  const data = Base("state");

  const board = await data.get("board");
  const difficulty = await data.get("difficulty");

  let r;

  if (!board || !difficulty) {
    r = await fetch(`/board/create`).then((res) => res.json());
  }

  console.log(board.value);
  return {
    board: board.value || r.board,
  };
}
