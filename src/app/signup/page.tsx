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
    <div className={`flex justify-center items-center h-[calc(100vh-75px)]`}>
      <div className="p-8 rounded-lg max-w-96">
        {step === 1 ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full mt-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full mt-2"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered w-full mt-2"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              className="input input-bordered w-full mt-2 mb-3"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}

            <button type="submit" className="btn btn-block btn-neutral">
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
      <h2 className="text-2xl font-bold mb-1">OTP Verification</h2>
      <p className="text-sm mb-4">Enter the OTP sent to {userData?.email}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        {...register("otp", { required: "OTP is required" })}
        className="input input-bordered w-full mb-2"
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Verify OTP
      </button>
      <span className="text-xs mt-1">
        * Don&apos;t refresh the page until OTP is verified
      </span>
    </form>
  );
}
