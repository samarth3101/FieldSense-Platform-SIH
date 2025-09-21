from fastapi import APIRouter, UploadFile, File, Depends
from ..pipeline.run_analysis import analyze_aoi
from .schemas import AnalyzeRequest, AnalyzeResponse

router = APIRouter(prefix="/fusion", tags=["FieldFusion"])

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(body: AnalyzeRequest) -> AnalyzeResponse:
    return await analyze_aoi(body, user_image=None)

@router.post("/analyze-with-image", response_model=AnalyzeResponse)
async def analyze_with_image(body: AnalyzeRequest = Depends(), image: UploadFile = File(...)) -> AnalyzeResponse:
    return await analyze_aoi(body, user_image=image)
