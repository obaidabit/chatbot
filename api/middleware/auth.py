import jwt
import os


def authorize(request):
    token = None
    if 'x-access-tokens' in request.headers:
        token = request.headers['x-access-tokens']

    if not token:
        return False
    try:
        data = jwt.decode(token, os.getenv('SECRET_KEY'))
        print(data)
    except:
        return False

    return True
