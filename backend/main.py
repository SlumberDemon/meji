import json
import deta
import sudoku
import random
import fastapi

state = deta.Base("state")
data = deta.Base("stats")
app = fastapi.FastAPI(docs_url=None, redoc_url=None)


@app.get("/create")
async def create_board(width: int = 3, height: int = 3, difficulty: float = 0.5):
    board = sudoku.Sudoku(width, height).difficulty(difficulty)
    b = [
        {"value": width, "key": "width"},
        {"value": height, "key": "height"},
        {"value": board.size, "key": "size"},
        {"value": difficulty, "key": "difficulty"},
        {"value": board.board, "key": "board"},
    ]
    state.put_many(b)
    return {"board": board.board}


@app.get("/validate")
async def validate_board():
    board = sudoku.Sudoku(board=state.get("board")["value"])
    return {"validate": board.validate()}


@app.get("/tip")
async def tip_board():
    board = sudoku.Sudoku(board=state.get("board")["value"])
    with open(f"tips/{str(board.validate()).lower()}.json") as f:
        c = f.read()

    j = json.loads(c)

    return {"tip": j["tips"][random.randint(0, len(j["tips"]) - 1)]}


# str(board.validate()).lower()
