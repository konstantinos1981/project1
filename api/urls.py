from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail(request):
    user = request.user
    return Response({'username': user.username, 'email': user.email})

urlpatterns = [
    path('login/', obtain_auth_token, name='api_token_auth'),
    path('me/', user_detail, name='user_detail'),
]