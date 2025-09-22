import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import { setTokens } from "../state/authSlice";

export const AuthCallbackRoute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("token");
    const refresh = params.get("refresh");

    console.log("Auth callback URL params:", window.location.search);
    console.log("Auth callback received tokens:", { access, refresh });

    if (access && refresh) {
      dispatch(setTokens({ access, refresh }));
      navigate("/"); // Redirect to homepage after successful login
    } else {
      console.error("No tokens found in callback URL");
      navigate("/login"); // Fallback
    }
  }, [dispatch, navigate]);

  return <p>Completing login...</p>;
};
