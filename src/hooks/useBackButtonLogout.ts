import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { logoutUser } from "../features/auth/AuthSlice";
import toast from "react-hot-toast";

const useBackButtonLogout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  // Attach and clean up the event listener for the popstate event
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      // Prevent the default back navigation
      event.preventDefault();
      // Perform logout
      handleLogout();
    };

    // Add event listener for the 'popstate' event
    // So that when the user tries to go back, the handlePopState function is called
    window.addEventListener("popstate", handlePopState);

    // Push a new state to the history to ensure we can catch the back navigation
    window.history.pushState(null, "", window.location.pathname);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useBackButtonLogout;
