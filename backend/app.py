from fastapi import FastAPI, Request, status
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse, StreamingResponse
from starlette.middleware.cors import CORSMiddleware
from pathlib import Path
import os
import uvicorn
import time
import base64
from jose import jws

app = FastAPI(
    title="Zoom Meeting Media Stream API",
    docs_url="/docs/swagger"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True, 
    allow_methods=["*"],    
    allow_headers=["*"]     
)

backend_dir = Path(os.path.dirname(__file__)).resolve()
app.mount("/static", StaticFiles(directory=backend_dir.joinpath("../frontend/build/static").resolve()), name="static")
templates = Jinja2Templates(directory=backend_dir.joinpath("../frontend/build").resolve())

# index page
@app.get("/")
async def serve_ui(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post(
    "/join", 
    tags=["Meeting"],
    description="join meeting",
)
def join():
    pass

@app.get(
    "/signature", 
    tags=["Meeting"],
    description="get signature",
)
def generate_signature(meetingId: str):
    print(meetingId)
    ROLE=0
    ZOOM_SDK_KEY=os.environ['ZOOM_SDK_KEY']
    ZOOM_SECRET=os.environ['ZOOM_SECRET']
    ts = int(round(time.time())) - 30
    expired = ts + 60 * 60
    payload = { 'sdkKey': ZOOM_SDK_KEY, 'iat': ts, 'exp': expired, 'mn': meetingId, 'role': ROLE }
    signature = jws.sign(payload, ZOOM_SECRET, algorithm='HS256')
    return {"signature": signature}

@app.get(
    "/stream",
    tags=["Meeting"],
    description="stream meeting media",
)
async def get_stream():
    fps = 60
    def generate():
        try:
            while True:
                time.sleep(1/fps)
                data = "test"
                frame = base64.b64decode(data)
                yield (b'--frame\r\n'
                            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        except GeneratorExit:
            print('closed')
        except Exception as err:
            print('error', err)
            return JSONResponse(status_code=500, content={"message": "Error: {}".format(err)})
    return StreamingResponse(generate(), media_type='multipart/x-mixed-replace; boundary=frame')


if __name__ == "__main__":
    uvicorn.run("__main__:app", host="0.0.0.0", reload=True, port=8000, log_level="info")
    