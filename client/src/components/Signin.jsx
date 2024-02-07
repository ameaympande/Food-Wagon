// Signin.js
import { UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import Input from "./layout/Input";
import Button from "./layout/Button";
import { LoginAPI } from "../apicalls/LoginAPI";
import { BeatLoader } from "react-spinners"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEmail, setUserId } from "../redux/features/profile/profileSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState({
    email: "",
    password: ""
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
    } else if (form.password.length < 6) {
      newError.password = "Password must be at least 6 characters.";
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      setError(newError);
    } else {
      setError(newError);
      try {
        const res = await LoginAPI(form);
        console.log(res);
        if (res.error) {
          setErrorResponse(res.error);
        }
        if (res.data.message) {
          setResponse(res.data.message);
          if (res.data.userId) dispatch(setUserId(res.data.userId));
          dispatch(setEmail(form.email));

          const token = res.data.token;
          localStorage.setItem("token", token);

          setTimeout(() => {
            console.log("Dispatching email:", form.email);
            navigate("/");
          }, 1000);

        }
      } catch (error) {
        console.error("Login failed:", error);
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
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
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
                buttonText="Login"
                color="#ffb512"
                textColor="text-primary"
                style="p-4 bg-secondary hover:text-secondary"
                textStyle="ml-0 px-2"
              />
            }
          </div>
          <p className="text-center font-medium">
            Don't have an account?{" "}
            <a href="signup" className="text-text-primary font-semibold hover:text-text-orange">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
