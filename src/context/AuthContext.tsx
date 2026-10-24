"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { isAdminEmail } from "@/utils/admin";

export interface AuthUser {
  id: string;
  googleId: string;
  name: string;
  email: string;
  picture?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalReason: string | null;
  openAuthModal: (reason?: string | unknown) => void;
  closeAuthModal: () => void;
  requireAuth: (callback: () => void, reason?: string) => void;
  loginWithCredential: (credential: string) => Promise<AuthUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthModalOpen: false,
  authModalReason: null,
  openAuthModal: () => {},
  closeAuthModal: () => {},
  requireAuth: () => {},
  loginWithCredential: async () => null,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Restore session from localStorage on initial load
  useEffect(() => {
    try {
      const stored = localStorage.getItem("shubhcoins_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        parsed.isAdmin = isAdminEmail(parsed.email);
        setUser(parsed);
        if (parsed.isAdmin) {
          sessionStorage.setItem("shubhcoins_admin_auth", "true");
        }
      }
    } catch (e) {
      console.warn("Failed to parse stored user session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openAuthModal = (reason?: string | unknown) => {
    setAuthModalReason(typeof reason === "string" ? reason : null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalReason(null);
    setPendingAction(null);
  };

  const requireAuth = (callback: () => void, reason?: string) => {
    if (user) {
      callback();
    } else {
      setPendingAction(() => callback);
      setAuthModalReason(
        reason || "Please sign in with Google to proceed to checkout."
      );
      setIsAuthModalOpen(true);
    }
  };

  const loginWithCredential = async (credential: string): Promise<AuthUser | null> => {
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.user) {
        const userObj: AuthUser = {
          ...data.user,
          isAdmin: isAdminEmail(data.user.email),
        };

        setUser(userObj);
        localStorage.setItem("shubhcoins_user", JSON.stringify(userObj));

        if (userObj.isAdmin) {
          sessionStorage.setItem("shubhcoins_admin_auth", "true");
        }

        const callbackToRun = pendingAction;
        setIsAuthModalOpen(false);
        setAuthModalReason(null);
        setPendingAction(null);

        if (callbackToRun) {
          callbackToRun();
        }

        return userObj;
      }
      return null;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("shubhcoins_user");
    sessionStorage.removeItem("shubhcoins_admin_auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthModalOpen,
        authModalReason,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        loginWithCredential,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
