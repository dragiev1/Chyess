import "../css/Login.css";
import LoginCard from "../components/LoginCard";
import KnightRookAnimation from "../components/KnightRookAnimation";
import { auth } from '../utils/auth';

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  try {
    const response = await fetch('http://localhost:3500/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const user = await response.json();
    auth.login(user);
    window.location.href = '/'; 
    
  } catch (err) {
    alert(err);
  }
})


const Login = () => {
  return (
    <div className="login-bg">
      <KnightRookAnimation />
      <LoginCard />
    </div>
  );
};

export default Login;
