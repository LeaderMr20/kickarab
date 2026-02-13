import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

// Simulated database (in production, use real database)
let usersDatabase = (() => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("kickarab_users_db");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
})();

// Hash password (simple implementation - use bcrypt in production)
const hashPassword = (password) => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return "hash_" + Math.abs(hash).toString(36);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("kickarab_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
      // Load users database
      const dbStored = localStorage.getItem("kickarab_users_db");
      if (dbStored) {
        usersDatabase = JSON.parse(dbStored);
      }
    } catch (error) {
      console.error("Auth load error:", error);
    }
    setLoading(false);
  }, []);

  function saveUsersDatabase() {
    if (typeof window !== "undefined") {
      localStorage.setItem("kickarab_users_db", JSON.stringify(usersDatabase));
    }
  }

  function register(userData) {
    // Check if email already exists
    if (usersDatabase.some((u) => u.email === userData.email)) {
      throw new Error("البريد الإلكتروني مستخدم بالفعل");
    }

    // Check if username exists
    if (userData.username && usersDatabase.some((u) => u.username === userData.username)) {
      throw new Error("اسم المستخدم مستخدم بالفعل");
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      password: userData.password ? hashPassword(userData.password) : null,
      authMethod: userData.authMethod || "email", // email, google
      createdAt: new Date().toISOString(),
      avatar: userData.avatar || null,
      bio: userData.bio || "",
    };

    // Don't store actual password in user object
    const userToStore = { ...newUser };
    delete userToStore.password;

    setUser(userToStore);
    localStorage.setItem("kickarab_user", JSON.stringify(userToStore));

    // Add to database
    usersDatabase.push(newUser);
    saveUsersDatabase();

    return userToStore;
  }

  function login(email, password) {
    // Find user by email
    const foundUser = usersDatabase.find((u) => u.email === email);

    if (!foundUser) {
      throw new Error("البريد الإلكتروني غير مسجل");
    }

    if (!foundUser.password) {
      throw new Error("هذا الحساب مسجل عبر جوجل. استخدم تسجيل الدخول عبر جوجل");
    }

    // Check password
    const passwordHash = hashPassword(password);
    if (foundUser.password !== passwordHash) {
      throw new Error("كلمة المرور غير صحيحة");
    }

    const userToStore = { ...foundUser };
    delete userToStore.password;

    setUser(userToStore);
    localStorage.setItem("kickarab_user", JSON.stringify(userToStore));

    return userToStore;
  }

  function loginWithGoogle(googleData) {
    // Check if user already exists with this email
    let foundUser = usersDatabase.find((u) => u.email === googleData.email);

    if (!foundUser) {
      // Create new user from Google data
      const newUser = {
        id: Date.now().toString(),
        email: googleData.email,
        name: googleData.name,
        avatar: googleData.picture || null,
        authMethod: "google",
        createdAt: new Date().toISOString(),
        bio: "",
      };

      usersDatabase.push(newUser);
      saveUsersDatabase();
      foundUser = newUser;
    } else if (foundUser.authMethod !== "google" && !foundUser.authMethod.includes("google")) {
      // Update existing user to support Google login
      foundUser.authMethod = "google";
      saveUsersDatabase();
    }

    const userToStore = { ...foundUser };
    delete userToStore.password;

    setUser(userToStore);
    localStorage.setItem("kickarab_user", JSON.stringify(userToStore));

    return userToStore;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("kickarab_user");
  }

  function updateProfile(updates) {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("kickarab_user", JSON.stringify(updated));

    // Update in database
    const dbUser = usersDatabase.find((u) => u.id === updated.id);
    if (dbUser) {
      Object.assign(dbUser, updates);
      saveUsersDatabase();
    }

    return updated;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
