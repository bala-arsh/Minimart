import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/account.css";

const ACCOUNT_STORAGE_KEY = "minimart-account";

const initialSignInForm = {
  email: "",
  password: "",
};

const initialSignUpForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function readStoredAccount() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const savedAccount = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);
    return savedAccount ? JSON.parse(savedAccount) : null;
  } catch {
    return null;
  }
}

const Account = () => {
  const [mode, setMode] = useState("signin");
  const [account, setAccount] = useState(readStoredAccount);
  const [signInForm, setSignInForm] = useState(initialSignInForm);
  const [signUpForm, setSignUpForm] = useState(initialSignUpForm);
  const [message, setMessage] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const handleSignInChange = (event) => {
    const { name, value } = event.target;
    setSignInForm((current) => ({ ...current, [name]: value }));
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpError("");
    setSignUpForm((current) => ({ ...current, [name]: value }));
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    setSignUpError("");

    if (!signInForm.email.trim() || !signInForm.password.trim()) {
      setMessage("Enter both email and password to sign in.");
      return;
    }

    const nextAccount = {
      name: signInForm.email.split("@")[0],
      email: signInForm.email.trim(),
      status: "Signed in",
    };

    window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(nextAccount));
    setAccount(nextAccount);
    setMessage("Signed in successfully.");
    setSignInForm(initialSignInForm);
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    setSignUpError("");

    if (!signUpForm.name.trim() || !signUpForm.email.trim() || !signUpForm.password.trim()) {
      setMessage("Fill in all required fields to create an account.");
      return;
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setSignUpError("Password mismatch. Enter the same password in both fields.");
      setMessage("Passwords do not match.");
      return;
    }

    const nextAccount = {
      name: signUpForm.name.trim(),
      email: signUpForm.email.trim(),
      status: "New account created",
    };

    window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(nextAccount));
    setAccount(nextAccount);
    setMessage("Account created and signed in.");
    setSignUpForm(initialSignUpForm);
  };

  const handleLogout = () => {
    window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
    setAccount(null);
    setMessage("Logged out successfully.");
    setMode("signin");
  };

  return (
    <div className="page-shell">
      <Header selectedCategory="all" setSelectedCategory={() => {}} />
      <main className="container account-page">
        {account ? (
          <section className="account-card logged-in-card">
            <p className="account-badge">{account.status}</p>
            <h2>Welcome, {account.name}</h2>
            <p className="account-email">{account.email}</p>
            <div className="account-summary-grid">
              <div>
                <span className="summary-label">Session</span>
                <strong>Active on this device</strong>
              </div>
              <div>
                <span className="summary-label">Storage</span>
                <strong>Saved in localStorage</strong>
              </div>
            </div>
            <button type="button" className="account-action logout" onClick={handleLogout}>
              Log out
            </button>
          </section>
        ) : (
          <section className="account-shell">
            <div className="account-switcher" role="tablist" aria-label="Account actions">
              <button
                type="button"
                className={`switcher-btn ${mode === "signin" ? "active" : ""}`}
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
              <button
                type="button"
                className={`switcher-btn ${mode === "signup" ? "active" : ""}`}
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </div>

            {mode === "signin" ? (
              <form className="account-card" onSubmit={handleSignIn}>
                <h2>Sign in to MiniMart</h2>
                <label className="account-field">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={signInForm.email}
                    onChange={handleSignInChange}
                    placeholder="you@example.com"
                  />
                </label>
                <label className="account-field">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={signInForm.password}
                    onChange={handleSignInChange}
                    placeholder="Enter password"
                  />
                </label>
                <button type="submit" className="account-action primary">
                  Sign in
                </button>
              </form>
            ) : (
              <form className="account-card" onSubmit={handleSignUp}>
                <h2>Create your account</h2>
                <label className="account-field">
                  Full name
                  <input
                    type="text"
                    name="name"
                    value={signUpForm.name}
                    onChange={handleSignUpChange}
                    placeholder="Your name"
                  />
                </label>
                <label className="account-field">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={signUpForm.email}
                    onChange={handleSignUpChange}
                    placeholder="you@example.com"
                  />
                </label>
                <label className="account-field">
                  Password
                  <input
                    type="password"
                    name="password"
                    value={signUpForm.password}
                    onChange={handleSignUpChange}
                    placeholder="Create password"
                  />
                </label>
                <label className="account-field">
                  Confirm password
                  <input
                    type="password"
                    name="confirmPassword"
                    value={signUpForm.confirmPassword}
                    onChange={handleSignUpChange}
                    placeholder="Confirm password"
                  />
                </label>
                {signUpError && (
                  <p className="account-notice error" role="alert">
                    {signUpError}
                  </p>
                )}
                <button type="submit" className="account-action primary">
                  Create account
                </button>
              </form>
            )}
          </section>
        )}

        {message && <p className="account-message">{message}</p>}
      </main>
      <Footer />
    </div>
  );
};

export default Account;
