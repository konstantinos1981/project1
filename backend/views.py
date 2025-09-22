from django.shortcuts import redirect
from rest_framework_simplejwt.tokens import RefreshToken


def frontend_redirect(request):
    user = request.user

    if not user.is_authenticated:
        return redirect("http://localhost:5173/login?error=unauthenticated")

    # create JWT tokens
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    # redirect to frontend with token in query string
    frontend_url = f"http://localhost:5173/auth/callback?token={access_token}&refresh={refresh}"
    return redirect(frontend_url)



