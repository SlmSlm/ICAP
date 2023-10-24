"use client";

import { useState } from "react";
import Input from "./Input";

export interface IForm {
  username: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<IForm>({ username: "", password: "" });
  const [errors, setErrors] = useState<IForm>({ username: "", password: "" });

  const handleFormChange = (fieldName: string, value: string) => {
    setForm({ ...form, [fieldName]: value });
    validateInput(fieldName, value);
  };

  const validateInput = (fieldName: string, value: string) => {
    if (fieldName === "username") {
      if (value.length < 1 || value.length > 150) {
        setErrors({
          ...errors,
          username: "Username should contain 1-150 characters",
        });
      } else {
        setErrors({ ...errors, username: "" });
      }
    }

    if (fieldName === "password") {
      if (value.length < 1 || value.length > 128) {
        setErrors({
          ...errors,
          password: "Password should contain 1-128 characters",
        });
      } else {
        setErrors({ ...errors, password: "" });
      }
    }
  };

  const hasErrors = Object.values(errors).some((error) => !!error);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <Input
              target="username"
              type="text"
              value={form.username}
              errors={errors}
              handleChange={handleFormChange}
            />
            <Input
              target="password"
              type="password"
              value={form.password}
              errors={errors}
              handleChange={handleFormChange}
            />

            <div>
              <button
                type="submit"
                disabled={hasErrors}
                className={`flex w-full justify-center rounded-md py-2 text-sm font-semibold leading-6 text-white shadow-sm ${
                  hasErrors
                    ? "bg-indigo-600 bg-opacity-50 text-opacity-50 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                }`}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
