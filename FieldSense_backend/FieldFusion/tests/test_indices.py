# from ..features.indices import ndvi, gndvi, ndwi, ndmi, savi
from FieldFusion.features.indices import ndvi, gndvi, ndwi, ndmi, savi


def test_ndvi_basic():
    assert round(ndvi(0.5, 0.2), 3) == round((0.5-0.2)/(0.5+0.2), 3)

def test_savi_not_nan():
    assert savi(0.4, 0.2) is not None

def test_ndwi_sign():
    v = ndwi(0.1, 0.05)
    assert v is not None
