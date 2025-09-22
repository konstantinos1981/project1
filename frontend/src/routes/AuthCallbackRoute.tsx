// AuthCallbackRoute.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import { setTokens } from "../state/authSlice";

export const AuthCallbackRoute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("token"); // backend sends "token" = access
    const refresh = params.get("refresh");

    if (access && refresh) {
      dispatch(setTokens({ access, refresh }));
      navigate("/"); // same redirect as username/password login
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <p>Completing login...</p>;
};
