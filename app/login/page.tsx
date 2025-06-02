"use client";

import { useState } from "react";
import * as Icons from "lucide-react";

function GoogleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.805 10.023h-9.78v3.954h5.615c-.24 1.44-1.68 4.23-5.615 4.23-3.39 0-6.15-2.82-6.15-6.3s2.76-6.3 6.15-6.3c1.92 0 3.21.81 3.945 1.5l2.685-2.58C16.5 5.4 14.43 4.5 12 4.5 6.75 4.5 2.7 8.91 2.7 14.1s4.05 9.6 9.3 9.6c5.37 0 8.85-3.75 8.85-9.03 0-.6-.06-1.02-.045-1.647z"
        fill="#4285F4"
      />
    </svg>
  );
}

function Input({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  icon,
  isValid,
}: {
  label: string;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  isValid?: boolean;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {isValid && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <Icons.CheckCircle />
          </div>
        )}
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        "w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-orange-600 transition duration-300 " +
        className
      }
    >
      {children}
    </button>
  );
}

function SocialButton({
  children,
  onClick,
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={
        "w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:shadow-md transition duration-300 " +
        className
      }
    >
      {children}
    </button>
  );
}

export default function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    if (isSignIn) {
      alert(`Intentando iniciar sesión con: ${email}`);
    } else {
      alert(`Intentando registrar cuenta con: ${email}`);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left Column */}
      <div className="flex flex-col justify-center items-center w-full max-w-md p-8 bg-white">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m8.485-8.485l-.707.707M4.222 4.222l-.707.707m16.97 8.485l-.707-.707M4.222 19.778l-.707-.707M21 12h-1M4 12H3"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7a5 5 0 015 5v0a5 5 0 01-5 5v0a5 5 0 01-5-5v0a5 5 0 015-5z"
            />
          </svg>
          <span className="text-2xl font-bold text-primary">EVENT FIRE</span>
        </div>

        {/* Title and Subtitle */}
        <h1 className="text-3xl font-bold mb-1">
          {isSignIn ? "Welcome Back" : "Create Your Account"}
        </h1>
        <p className="text-gray-500 mb-6">
          {isSignIn
            ? "Welcome Back, Please enter your details"
            : "Create your account to get started"}
        </p>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Authentication Tabs"
          className="flex mb-6 bg-gray-100 rounded-full p-1 text-sm font-semibold text-gray-700 shadow-inner"
        >
          <button
            role="tab"
            aria-selected={isSignIn}
            aria-controls="signin-panel"
            id="signin-tab"
            onClick={() => setIsSignIn(true)}
            className={`flex-1 py-3 rounded-full text-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
              isSignIn
                ? "bg-white text-primary shadow-lg"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Sign In
          </button>
          <button
            role="tab"
            aria-selected={!isSignIn}
            aria-controls="signup-panel"
            id="signup-tab"
            onClick={() => setIsSignIn(false)}
            className={`flex-1 py-3 rounded-full text-center transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
              !isSignIn
                ? "bg-white text-primary shadow-lg"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <Input
            label="Email Address"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@example.com"
            icon={<Icons.Mail />}
            isValid={emailValid}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            icon={<Icons.Lock />}
          />
          {error && (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          )}
          <Button type="submit">{isSignIn ? "Continue" : "Register"}</Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6 text-gray-400">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 whitespace-nowrap">Or Continue With</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center space-x-4">
          <SocialButton
            ariaLabel="Sign in with Google"
            className="hover:bg-gray-100 hover:text-gray-800"
          >
            <GoogleIcon size={24} />
          </SocialButton>
          <SocialButton
            ariaLabel="Sign in with Apple"
            className="hover:bg-black hover:text-white"
          >
            <Icons.Apple size={24} />
          </SocialButton>
          <SocialButton
            ariaLabel="Sign in with Facebook"
            className="hover:bg-blue-600 hover:text-white"
          >
            <Icons.Facebook size={24} />
          </SocialButton>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-gray-500 text-sm max-w-xs">
          Join the millions of users who trust EVENT FIRE to manage their events
          and stay connected.
        </p>
      </div>

      {/* Right Column */}
      <div className="hidden md:flex flex-1 bg-gradient-to-br from-orange-500 via-red-600 to-red-700 justify-center items-center">
        {/* Placeholder for image or illustration */}
        <img
          src="/event-fire-illustration.png"
          alt="EVENT FIRE Illustration"
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </main>
  );
}
