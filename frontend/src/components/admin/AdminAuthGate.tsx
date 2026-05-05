"use client";

import { useEffect, useState } from "react";
import { adminAuthApi } from "@/lib/adminMenuApi";
import styles from "./AdminAuthGate.module.scss";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem(adminAuthApi.tokenKey);
    setIsAuthenticated(Boolean(token));
    setIsReady(true);
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    try {
      const data = await adminAuthApi.login(username, password);
      window.localStorage.setItem(adminAuthApi.tokenKey, data.token);
      setIsAuthenticated(true);
      setPassword("");
    } catch {
      setError("Неверный логин или пароль");
    }
  };

  const handleLogout = async () => {
    await adminAuthApi.logout();
    window.localStorage.removeItem(adminAuthApi.tokenKey);
    setIsAuthenticated(false);
  };

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.gate}>
        <div className={styles.card}>
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              className={styles.input}
              placeholder="Логин"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
            <input
              className={styles.input}
              placeholder="Пароль"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            <button className={styles.loginButton} type="submit">
              Войти
            </button>
            {error ? <p className={styles.error}>{error}</p> : null}
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
