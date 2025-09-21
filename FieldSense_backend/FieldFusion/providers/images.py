from fastapi import UploadFile
from typing import Optional

async def preprocess_user_image(user_image: Optional[UploadFile]):
    if not user_image:
        return None
    content = await user_image.read()
    # TODO: decode, resize, normalize; return embedding or tensor
    return {"bytes": len(content)}
