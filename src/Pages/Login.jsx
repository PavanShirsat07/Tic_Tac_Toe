import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserState";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { username, setusername ,isLogin,setisLogin} = useContext(UserContext);
  const [Data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // For displaying errors
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/auth/login")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log("Error fetching users:", err.message);
      });
  }, []);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginPayload = {
      username: loginData.username,
      password: loginData.password,
    };

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        console.log("Login successful!");
        setusername(loginData.username);
        navigate("/Opponents"); // Redirect after successful login
      } else {
        setErrorMessage(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error during login. Please try again.");
      console.error("Error during login:", error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const signupPayload = {
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
    };

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupPayload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Signup successful!", result);
        setSignupData({
          username: "",
          email: "",
          password: "",
        });
        setisLogin(true); // Switch to login form after signup
      } else {
        setErrorMessage(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error during signup. Please try again.");
      console.error("Error during signup:", error);
    }
  };

  const toggleForm = () => {
    setisLogin(!isLogin);
    setErrorMessage(""); // Clear any error messages when switching forms
  };

  return (
    <div className="container Body">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isLogin ? (
        <div className="form-container" id="login-form">
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit">Login</button>
          </form>
          <p>
            Don't have an account?{" "}
            <a href="#" id="signup-link" onClick={toggleForm}>
              Sign up
            </a>
          </p>
        </div>
      ) : (
        <div className="form-container" id="signup-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="new-username">Username</label>
            <input
              type="text"
              id="new-username"
              name="username"
              value={signupData.username}
              onChange={handleSignupChange}
              required
            />
            <label htmlFor="new-email">Email</label>
            <input
              type="email"
              id="new-email"
              name="email"
              value={signupData.email}
              onChange={handleSignupChange}
              required
            />
            <label htmlFor="new-password">Password</label>
            <input
              type="password"
              id="new-password"
              name="password"
              value={signupData.password}
              onChange={handleSignupChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
          <p>
            Already have an account?{" "}
            <a href="#" id="login-link" onClick={toggleForm}>
              Login
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
