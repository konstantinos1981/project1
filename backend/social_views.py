# backend/social_views.py
from django.shortcuts import redirect
from django.conf import settings
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.models import SocialLogin
from rest_framework_simplejwt.tokens import RefreshToken
from django.views import View

class GoogleAuthCallback(View):
    """
    Custom view to handle Google OAuth2 callback, issue JWTs, and redirect to React frontend.
    """

    def get(self, request, *args, **kwargs):
        adapter = GoogleOAuth2Adapter()
        social_login = SocialLogin(adapter=adapter)

        # Populate SocialLogin (fetch user info from Google)
        social_login.lookup()

        # Save or update the user
        social_login.save(request, connect=True)

        # Generate JWT tokens using simplejwt
        refresh = RefreshToken.for_user(social_login.user)
        access = str(refresh.access_token)
        refresh_token = str(refresh)

        # Build frontend callback URL
        frontend_url = f"{settings.LOGIN_REDIRECT_URL}?token={access}&refresh={refresh_token}"

        return redirect(frontend_url)
