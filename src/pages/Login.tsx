import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleLogin } from "../utils/auth.utils";
import { useState } from "react";
import { useNavigate } from "react-router";

// Define Zod schema for validation
const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

function Login() {
  // Set up react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  let navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data: { email: string; password: string }) => {
    // console.log("Form Data:", data);
    const result = await handleLogin(data);

    if (result.success) {
      setIsSuccess(true);
      setMessage("Signup successful!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setIsSuccess(false);
      setMessage(`${result.error}`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h1 className="mb-6 w-full text-3xl font-bold tracking-wider text-center">
          Login
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="mt-2 text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.password && (
            <p className="mt-2 text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-3 rounded-lg hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </button>
        {message && (
          <div
            className={`w-full border ${
              isSuccess
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            } p-3 rounded-lg flex justify-center items-center mt-4`}>
            <p>{message}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
