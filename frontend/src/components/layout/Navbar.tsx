import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { logout } from "../../state/authSlice";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { access } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        MyApp
      </Link>
      <div>
        {access ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};
