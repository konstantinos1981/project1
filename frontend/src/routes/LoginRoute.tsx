import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Github, Mail } from "lucide-react";
import { AxiosError } from "axios";
import { useAppDispatch } from "../state/hooks";
import { setTokens } from "../state/authSlice";
import { login } from "@/lib/api";

export const LoginRoute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const tokens = await login(credentials); // should return { access, refresh }
      dispatch(setTokens(tokens));
      toast.success("Login successful!");
      navigate("/"); // same as social login redirect
    } catch (err) {
      const error = err as AxiosError<{ detail: string }>;
      const detail = error.response?.data?.detail;
      toast.error(detail ?? "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/accounts/google/login/";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8000/accounts/github/login/";
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose your preferred login method</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Button
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Login with Google
            </Button>
            <Button
              variant="outline"
              onClick={handleGithubLogin}
              disabled={isLoading}
            >
              <Github className="mr-2 h-4 w-4" />
              Login with GitHub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  disabled={isLoading}
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  disabled={isLoading}
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login with Email"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
