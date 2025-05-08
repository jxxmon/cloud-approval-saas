# backend/config/settings/production.py
from .base import *

DEBUG = False
ALLOWED_HOSTS = ['52.79.217.2', 'backend']

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "http://52.79.217.2:3000",
]
CSRF_TRUSTED_ORIGINS = [
    "http://52.79.217.2:3000",
]

import os
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')