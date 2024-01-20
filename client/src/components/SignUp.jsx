// Signin.js
import { UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Input from "./layout/Input";
import Button from "./layout/Button";
import { useNavigate } from "react-router-dom";
import { SignUpAPI } from "../apicalls/SignUpAPI";
import { BeatLoader } from "react-spinners";

const Signup = () => {
  const navigate = useNavigate();
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

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: "" });
  };


  useEffect(() => {
    setResponse("");
    setErrorResponse("");
  }, [form])

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
      setError(newError);
    } else {
      try {
        const res = await SignUpAPI(form);
        console.log(res);
        if (res.data.error) {
          setErrorResponse(res.data.error);
        }
        if (res.data.message) {
          setResponse(res.data.message);

          setTimeout(() => {
            navigate("/signin");
          }, 1000);

        }
      } catch (error) {
        console.error("signin failed:", error);
      } finally {
        setLoading(false);
      }


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
          {errorResponse
            && <p className="mt-1 text-lg font-semibold text-text-red mb-4">{errorResponse}</p>
          }
          {response
            && <p className="mt-1 text-lg font-semibold text-text-green mb-4">{response}</p>
          }
          <div className="flex justify-center mb-6">
            {loading ?
              <BeatLoader color="white" className="mt-4" />
              :
              !response && !errorResponse &&
              <Button
                buttonText="Sign up"
                color="#ffb512"
                textColor="text-primary"
                style="p-4 bg-secondary hover:text-secondary"
                textStyle="ml-0 px-2"
              />
            }
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
