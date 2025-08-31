import React, { useState } from "react";
import Button from "../commons/Button";
import Input from "../commons/Input";
import { loginUser, signupUser } from "../../services/authServices";

const AuthForm = ({ mode = "login", onSuccess }) => {
    console.log("max ver stapen")
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await loginUser(formData);
      } else {
        await signupUser(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        placeholder="Enter your password"
      />
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <Button type="submit">{mode === "login" ? "Login" : "Sign Up"}</Button>
    </form>
  );


};

export default AuthForm;
