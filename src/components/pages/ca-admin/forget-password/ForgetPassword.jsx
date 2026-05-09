"use client"
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

export default function ForgetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
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

   

  

    {/* Submit Button */}
    <div className="submit-wrapper">
      <button type="submit">
        Get OTP
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
