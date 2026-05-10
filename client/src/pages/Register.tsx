import KnightRookAnimation from "../components/KnightRookAnimation";
import RegisterCard from "../components/RegisterCard";
import "/src/css/Login.css";

import { auth } from '../utils/auth';

document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  try {
    const response = await fetch('http://localhost:3500/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    const user = await response.json();
    auth.login(user);
    window.location.href = '/';
    
  } catch (err) {
    alert(err);
  }
});

const Register = () => {
  return (
    <div className="login-bg">
      <KnightRookAnimation />
      <RegisterCard />
    </div>
  );
};

export default Register;
