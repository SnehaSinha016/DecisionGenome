from fastapi import FastAPI

app = FastAPI()

@app.post("/test")
def test(data: dict):
    print(data)
    return data