from ..core.utils import safe_div

def ndvi(B8, B4): 
    return safe_div((B8 - B4), (B8 + B4))

def gndvi(B8, B3):
    return safe_div((B8 - B3), (B8 + B3))

def ndwi(B3, B11):
    return safe_div((B3 - B11), (B3 + B11))

def ndmi(B8, B11):
    return safe_div((B8 - B11), (B8 + B11))

def savi(B8, B4, L=0.5):
    return safe_div((1 + L) * (B8 - B4), (B8 + B4 + L))
