"use client";
import {
  useSignupMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/authApiSlice";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

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
  const [addSignUpData] = useSignupMutation();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      redirect("/me");
    }
  }, []);

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    setUserData(data);

    addSignUpData(data).then((res) => {
      if (!res.error) {
        setStep(2);
      }
      if (res.error) {
        console.log(res);
        Swal.fire({
          icon: "error",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          title: res?.error?.data?.message,
        });
      }
    });
  };

  return (
    <div className={`flex h-[calc(100vh-150px)] items-center justify-center`}>
      <div className="max-w-96 rounded-lg p-6 sm:p-7 lg:p-0">
        {step === 1 ? (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="mb-4 text-3xl font-bold lg:text-4xl">SignUp</h2>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered mt-2 w-full rounded-full shadow-md"
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
                className="input input-bordered mt-2 w-full rounded-full shadow-md"
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
                className="input input-bordered mt-2 w-full rounded-full shadow-md"
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
                className="input input-bordered mb-3 mt-2 w-full rounded-full shadow-md"
              />
              {errors.confirmPassword && (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}

              <button
                type="submit"
                className="btn btn-neutral btn-block mt-4 rounded-full"
              >
                Send OTP
              </button>
            </form>
            <div className="mt-3 text-center">
              <span className="text-sm">
                Already have an account?
                <Link href="/login" className="px-2 text-primary underline">
                  Login
                </Link>
              </span>
            </div>
          </>
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
  const [addOtp] = useVerifyOtpMutation();

  const onSubmit: SubmitHandler<OtpFormData> = (data) => {
    console.log("OTP Verified!", data, userData);
    addOtp({ ...userData, ...data }).then((res) => {
      const isError = res.error ? true : false;
      console.log(res);
      Swal.fire({
        icon: isError ? "error" : "success",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        title: isError ? res?.error?.data?.message : "Success",
        text: isError ? "Please try again" : "Signup successful, now login",
      }).then(() => {
        if (!isError) {
          redirect("/login");
        }
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mb-1 text-2xl font-bold">OTP Verification</h2>
      <p className="mb-4 text-sm">Enter the OTP sent to {userData?.email}</p>
      <input
        type="text"
        placeholder="Enter OTP"
        {...register("otp", { required: "OTP is required" })}
        className="input input-bordered mb-2 w-full rounded-full"
      />
      <button
        type="submit"
        className="w-full rounded-full bg-green-500 p-2 text-white"
      >
        Verify OTP
      </button>
      <span className="mt-1 text-xs">
        * Don&apos;t refresh the page until OTP is verified
      </span>
    </form>
  );
}
