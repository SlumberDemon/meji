// find way to fix board not being created when empty

import { Base } from "deta";

export async function load() {
  const settings = Base("settings");
  const state = Base("state");
  const stats = Base("stats");

  const board = await state.get("board");
  // const difficulty = await state.get("difficulty");
  const tip = await settings.get("tip");
  const pop = await settings.get("pop");
  const solved = await stats.get("solved");

  let p;
  let t;
  let s;

  if (!board) {
    t = await settings.put({ value: true, key: "tip" });
    p = await settings.put({ value: true, key: "pop" });
    s = await stats.put({ value: 0, key: "solved" });
  }

  return {
    board: board?.value ?? [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
    ],
    solved: solved?.value ?? s?.value ?? 0,
    tip: tip?.value ?? t?.value ?? true,
    pop: pop?.value ?? p?.value ?? true,
  };
}
