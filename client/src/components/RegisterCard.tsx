import { useState, type ChangeEvent } from "react";
import type { User } from "../types/user";
import "../css/ContentCard.css";

const RegisterCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    lastName?: string,
    firstName?: string
  }>({});

  const handleRegister = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Please enter your last name';
    }
    if (!firstName.trim()) {
      newErrors.firstName = 'Please enter your last name';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.warn('Validation errors:', newErrors);
      return;
    }
    
    const newUser: User = {
      id: Date.now(),
      email: email.trim(),
      password: password,
      registeredAt: new Date().toISOString(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };

    console.log('Registered User Object:', newUser);
    
    setErrors({});
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
  };

  const getInputClass = (fieldName: keyof typeof errors) => {
    return `login-input ${errors[fieldName] ? 'input-error' : ''}`;
  };

  return (
    <form className="login-card" onSubmit={handleRegister}>
      <div className="login-title">Create Account</div>
      
      {/* Email Input */}
      <div>
        <input 
          type="email" 
          className={getInputClass('email')}
          placeholder="Enter email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors(prev => ({ ...prev, email: undefined }));
            }
          }}
          required
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      {/* Name Input */}
      <div>
          <input
            type="first name"
            className="login-input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="last name"
            className="login-input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

      {/* Password Input */}
      <div className="mt-4">
        <input
          type="password"
          className={getInputClass('password')}
          placeholder="Create password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            if (errors.password) {
              setErrors(prev => ({ ...prev, password: undefined }));
            }
          }}
          required
          minLength={6}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      {/* Confirm Password Input */}
      <div className="mt-4">
        <input
          type="password"
          className={getInputClass('confirmPassword')}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) {
              setErrors(prev => ({ ...prev, confirmPassword: undefined }));
            }
          }}
          required
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <button type="submit" className="login-button mt-4">Register</button>
    </form>
  );
};

export default RegisterCard;