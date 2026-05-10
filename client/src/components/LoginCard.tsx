import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import type { LoginAttempt } from "../types/user";

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const loginData: LoginAttempt = {
      email: email.trim(),
      password: password,
      timestamp: new Date().toISOString(),
    };
    console.log(loginData);
  };


  return (
    <form className="login-card" onSubmit={handleLogin}>
      <div className="login-title">Login</div>
      <div>
        <input 
          type="email" 
          className="login-input" 
          placeholder="Enter email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
      </div>

      <div className="mt-4">
        <input
          type="password"
          className="login-input"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="login-button">Sign In</button>

      {/* Divider */}
      <div className="divider">
        <span>OR</span>
      </div>

      <Link to={"/register"}>
        {/* Google Button (Register Button for just for Assignment 2 [hi hoffmann!])*/}
        <button type="button" className="google-button">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="google-icon"
          />
          Sign in with Google
        </button>
      </Link>
    </form>
  );
};

export default LoginCard;
