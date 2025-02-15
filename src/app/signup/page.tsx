"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface OtpFormData {
  otp: string;
}

export default function SignupForm() {
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<SignupFormData | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    setUserData(data);
    setStep(2);
  };

  return (
    <div className={`flex h-[calc(100vh-75px)] items-center justify-center`}>
      <div className="max-w-96 rounded-lg p-8">
        {step === 1 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-4 text-2xl font-bold">Signup</h2>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered mt-2 w-full"
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered mt-2 w-full"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered mt-2 w-full"
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="input input-bordered mb-3 mt-2 w-full"
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}

            <button type="submit" className="btn btn-neutral btn-block">
              Next
            </button>
          </form>
        ) : (
          <OtpForm userData={userData} />
        )}
      </div>
    </div>
  );
}

interface OtpFormProps {
  userData: SignupFormData | null;
}

function OtpForm({ userData }: OtpFormProps) {
  const { register, handleSubmit } = useForm<OtpFormData>();

  const onSubmit: SubmitHandler<OtpFormData> = (data) => {
    console.log("OTP Verified!", data, userData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-1 text-2xl font-bold">OTP Verification</h2>
      <p className="mb-4 text-sm">Enter the OTP sent to {userData?.email}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        {...register("otp", { required: "OTP is required" })}
        className="input input-bordered mb-2 w-full"
      />
      <button
        type="submit"
        className="w-full rounded bg-green-500 p-2 text-white"
      >
        Verify OTP
      </button>
      <span className="mt-1 text-xs">
        * Don&apos;t refresh the page until OTP is verified
      </span>
    </form>
  );
}
