"use client";

import { createContext, useCallback, useContext, useState } from "react";

const ProfileContext = createContext(null);

const DEFAULT_PROFILE = {
  name: "Admin User",
  email: "hello@peaceitech.com",
  phone: "",
  role: "Administrator",
  bio: "",
  avatar: "",
};

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  const updateProfile = useCallback((patch) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
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
