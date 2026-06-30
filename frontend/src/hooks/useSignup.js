import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthContext } from "../context/AuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await credential.user.getIdToken();
      const user = { email, token };

      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      setIsLoading(false);
      return true;
    } catch (err) {
      setIsLoading(false);
      const msg =
        err.code === "auth/email-already-in-use"
          ? "Email already in use"
          : err.code === "auth/weak-password"
          ? "Password should be at least 6 characters"
          : err.code === "auth/invalid-email"
          ? "Invalid email"
          : "Signup failed";
      setError(msg);
      return false;
    }
  };

  return { signup, isLoading, error };
};
