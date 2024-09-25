import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loginStatus = localStorage.getItem('loginStatus');
    const loginTime = localStorage.getItem('loginTime');

    if (loginStatus && Date.now() - loginTime < 5 * 60 * 1000) {
      onLogin();
    }
  }, [onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem('loginStatus', 'loggedIn');
      localStorage.setItem('loginTime', Date.now());
      onLogin();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" max-w-sm mx-auto">
      <div className="flex gap-2">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
        />
        <Button type="submit">Login</Button>
      </div>
      {error && <p className="text-red-500 text-center mt-5">{error}</p>}
    </form>
  );
}