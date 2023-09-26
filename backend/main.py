import deta
import sudoku
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
