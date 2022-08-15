import jwt
import os


def authorize(request):
    token = request.cookies.get('x-access-tokens')

    try:
        data = jwt.decode(token, os.getenv('SECRET_KEY'), algorithms=['HS256'])
    except:
        return False
    if data:
        return True
    else:
        return False
