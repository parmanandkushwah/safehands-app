import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

const USER_ENDPOINT = "https://safehands-backend.onrender.com/api/auth/user";
const LOGIN_ENDPOINT = "https://safehands-backend.onrender.com/api/auth/login";
const LOGOUT_ENDPOINT = "https://safehands-backend.onrender.com/api/auth/logout";

export function useAuth() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  // ✅ Fetch current logged-in user
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const res = await fetch(USER_ENDPOINT, {
        credentials: "include", // Send cookies
      });
      if (!res.ok) throw new Error("Not logged in");
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  // ✅ Login method
  const login = async (email, password) => {
    const res = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    await queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    return data;
  };

  // ✅ Logout method
  const logout = async () => {
    await fetch(LOGOUT_ENDPOINT, {
      method: "POST",
      credentials: "include",
    });

    queryClient.removeQueries({ queryKey: ["/api/auth/user"] });
    setLocation("/login");
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    error,
  };
}
