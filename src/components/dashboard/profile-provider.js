"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  apiFetch,
  auth,
  clearSession,
  getStoredUser,
  getToken,
  saveUser,
  toFormData,
} from "@/lib/api-client";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const router = useRouter();
  // Seeded from localStorage so the sidebar renders the right name on the
  // first paint, then confirmed against /api/auth/me.
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      if (!getToken()) {
        router.replace("/login");
        return;
      }

      setProfile(getStoredUser());

      try {
        const { user } = await auth.me();
        if (!active) return;
        setProfile(user);
        saveUser(user);
      } catch {
        // apiFetch already dropped the token on a 401.
        if (!active) return;
        clearSession();
        router.replace("/login");
        return;
      } finally {
        if (active) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      active = false;
    };
  }, [router]);

  // Saves the signed-in user's own record. `avatarFile` switches the request
  // to multipart so Cloudinary gets the image.
  const updateProfile = useCallback(
    async (patch, avatarFile) => {
      const body = avatarFile
        ? toFormData({ ...patch, profilePicture: avatarFile })
        : patch;

      const { user } = await apiFetch(`/api/users/${profile._id}`, {
        method: "PATCH",
        body,
      });

      setProfile(user);
      window.localStorage.setItem("peace-itech.user", JSON.stringify(user));
      return user;
    },
    [profile],
  );

  const logout = useCallback(() => {
    clearSession();
    router.replace("/login");
  }, [router]);

  if (loading || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        <span className="sr-only">Loading your account…</span>
      </div>
    );
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, logout }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return ctx;
}
