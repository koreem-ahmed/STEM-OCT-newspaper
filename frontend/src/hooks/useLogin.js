import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthContext } from "../context/AuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const token = await credential.user.getIdToken();
      const user = { email, token };

      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      setIsLoading(false);
      return true;
    } catch (err) {
      setIsLoading(false);
      const msg =
        err.code === "auth/invalid-credential" || err.code === "auth/user-not-found"
          ? "Invalid email or password"
          : err.code === "auth/invalid-email"
          ? "Invalid email"
          : "Login failed";
      setError(msg);
      return false;
    }
  };

  return { login, isLoading, error };
};
