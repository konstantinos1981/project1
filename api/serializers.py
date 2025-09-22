from dj_rest_auth.serializers import JWTSerializer
from rest_framework import serializers

class CustomJWTSerializer(JWTSerializer):
    access = serializers.CharField()
    refresh = serializers.CharField()
