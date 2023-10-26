"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logIn } from "../api/api";
import { IErrors } from "../types/interfaces";
import { validateInput } from "../utils/inputValidator";
import Input from "./Input";
import Preloader from "./Preloader/Preloader";
import Image from "next/image";
import companyLogo from "../public/img/companyLogo.png";

export interface IForm {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState<IForm>({ username: "", password: "" });
  const [errors, setErrors] = useState<IErrors>({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const hasErrors = Object.values(form).some(
    (field) => field === "" || field === null || field === undefined
  );

  const handleFormChange = (fieldName: string, value: string) => {
    setForm({ ...form, [fieldName]: value });
    setErrors({ ...errors, [fieldName]: validateInput(fieldName, value) });
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();

    if (!hasErrors) {
      try {
        await logIn("/api/login/", form);
        router.push("/table");
      } catch (e) {
        throw e;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image src={companyLogo} alt="logo" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(e) => signIn(e)} className="space-y-6">
            {Object.keys(form).map((fieldName) => (
              <Input
                target={fieldName}
                type={fieldName === "password" ? "password" : "text"}
                value={form[fieldName as keyof IForm]}
                errors={errors}
                handleChange={handleFormChange}
                labelIsNeeded={true}
                key={fieldName}
              />
            ))}

            <div>
              {isLoading ? (
                <Preloader />
              ) : (
                <button
                  disabled={hasErrors}
                  type="submit"
                  className={`flex w-full justify-center rounded-md py-2 text-sm font-semibold leading-6 text-white shadow-sm ${
                    hasErrors
                      ? "bg-indigo-600 bg-opacity-50 text-opacity-50 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  }`}
                >
                  Sign in
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}
