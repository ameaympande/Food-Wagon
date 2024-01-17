// Signin.js
import { UserIcon } from "lucide-react";
import React, { useState } from "react";
import Input from "./layout/Input";
import Button from "./layout/Button";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let hasError = false;
    const newError = { email: "", password: "" };

    if (!form.email) {
      newError.email = "Email is required.";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newError.email = "Invalid email address";
      hasError = true;
    }

    if (!form.password) {
      newError.password = "Password is required.";
      hasError = true;
    } else if (form.password.length <= 6) {
      newError.password = "Password must be at least 7 characters.";
      hasError = true;
    } else if (form.password !== form.confirmpassword) {
      newError.password = "Password should be match.";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
    } else {
      console.log("Login Clicked.");
      // Add your login logic here
    }
  };

  return (
    <div className="flex p-3 justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/loginbg.jpg')" }}>
      <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 p-6 border rounded-md bg-opacity-90 bg-primary">
        <div className="flex flex-col items-center justify-center">
          <UserIcon className="mb-3" size={30} color="black" />
          <h2 className="text-2xl font-bold mb-4 text-center">Create new account</h2>
        </div>
        <form className="text-center" onSubmit={handleLogin}>
          <Input
            className="mb-4"
            name="email"
            type="text"
            placeholder="Email"
            value={form.email}
            error={error.email}
            onChange={handleInputChange}
          />
          <Input
            className="mb-4"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            error={error.password}
            onChange={handleInputChange}
          />
          <Input
            className="mb-4"
            name="confirmpassword"
            type="password"
            placeholder="confirm password"
            value={form.confirmpassword}
            error={error.password}
            onChange={handleInputChange}
          />
          <div className="flex justify-center mb-4">
            <Button
              buttonText="Sign Up"
              color="#ffb512"
              textColor="text-primary"
              style="p-4 bg-secondary hover:text-secondary"
              textStyle="ml-0 px-2"
            />
          </div>
          <p className="text-center font-medium">
            Already have an account?{" "}
            <a href="signin" className="text-text-primary font-semibold hover:text-text-orange">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
