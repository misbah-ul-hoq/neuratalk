"use client";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [addLoginData] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
    addLoginData(data).then((res) => {
      console.log(res);
      if (res.error) {
        Swal.fire({
          icon: "error",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          text: res?.error?.data?.message,
        });
      } else {
        // localStorage.setItem("authToken", res.data.authToken);
        Swal.fire({
          icon: "success",
          title: "Login successful",
          text: "You are now logged in",
        }).then(() => {
          dispatch(loginSuccess(res.data));
          redirect("/me");
        });
      }
    });
  };

  return (
    <section className="flex min-h-[calc(100vh-100px)] items-center justify-center">
      <div className="w-full max-w-sm rounded-2xl p-6">
        <h2 className="mb-4 text-center text-2xl font-semibold lg:text-3xl">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full rounded-full shadow-md"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mt-3">
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered w-full rounded-full shadow-md"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-neutral btn-block mt-6 rounded-full"
          >
            Login
          </button>
        </form>

        <div className="mt-5 flex flex-col justify-center gap-2 text-center">
          <Link href={`/forgot-password`} className="text-sm">
            Forgot Password?
          </Link>
          <span className="block text-center text-sm">
            New to Neuratalk?
            <Link href={`/signup`} className="pl-2 text-primary underline">
              Signup
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
