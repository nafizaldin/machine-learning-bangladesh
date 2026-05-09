'use client';
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import authStore from "@/store/authStore";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await authStore.login(data);


  if (authStore.isAuthenticated) {
    toast.success("Login Successful!");
    router.replace("/admin/dashboard");
  } else {
    toast.error(authStore.loginError || "Invalid credentials!");
  }
  };

  return (
  <div className="ca-login">
  {/* Logo */}
  <Link href="/">
    <div className="logo-link">
      <Image
        src="/monogram.svg"
        alt="logo"
        width={55}
        height={55}
      />
      <h1>Orifine</h1>
    </div>
  </Link>



  {/* Form */}
  <form onSubmit={handleSubmit(onSubmit)} className="form">
    {/* Email */}
    <div>
      <input
        type="email"
        placeholder="Enter E-mail"
        {...register("email", {
          required: "E-mail is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid e-mail address",
          },
        })}
      />
      {errors.email && (
        <p>{errors.email.message}</p>
      )}
    </div>

    {/* Password */}
    <div>
      <input
        type="password"
        placeholder="Enter Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />
      {errors.password && (
        <p>{errors.password.message}</p>
      )}
    </div>

    {/* Forgot Password */}
    <Link href="/forget-password" className="forgot-password">
      Forgot Password
    </Link>

    {/* Submit Button */}
    <div className="submit-wrapper">
      <button type="submit" className="cursor-pointer">
        Log In
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="18"
          viewBox="0 0 9 18"
          fill="none"
        >
          <path
            d="M0.75 1.5L8.25 9L0.749999 16.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  </form>
</div>

  );
}
