import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

export function useAuth() {
    const queryClient = useQueryClient();
    const [, setLocation] = useLocation();

    const { data: user, isLoading, error } = useQuery({
        queryKey: ["/api/auth/user"],
        queryFn: async () => {
            const res = await fetch("/api/auth/user", { credentials: "include" });
            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }
            return res.json();
        },
        retry: false,
    });

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            // Invalidate user session
            queryClient.invalidateQueries({
                queryKey: ["/api/auth/user"],
            });

            setLocation("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        error,
    };
}
