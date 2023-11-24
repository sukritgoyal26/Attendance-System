"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { adminRegister } from "@/store/reducer/admin/adminRegisterReducer";
import { hostURL } from "@/app/utils";

const Register = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(adminRegister(data))
      .then((response) => {
        // Extract the response data from the 'data' property
        const responseData = response.data;
        const { token, isAdmin } = responseData;

        // Store the token and isAdmin status in the local storage
        localStorage.setItem("token", token);
        localStorage.setItem("admin", isAdmin);

        // Redirect to the appropriate dashboard based on the isAdmin status
        if (isAdmin) {
          router.push(`${hostURL()}/admin/dashboard`);
        } else {
          router.push(`${hostURL()}`);
        }
      })
      .catch((error) => {
        console.log("Registration failed:", error.message);
      });
  };
  // if admin is already logged in or registered
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`${hostURL()}/admin/dashboard`);
    }
  }, []);

  return (
    <section className="bg-card">
      <div className="flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex">
          <div className="w-full lg:w-1/2 bg-white shadow md:mt-0 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-textColor md:text-2xl ">
                Admin Registration
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label
                    for="firstName"
                    className="block mb-2 text-sm font-medium text-textColor "
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className="bg-card border border-gray-300 text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label
                    for="lastName"
                    className="block mb-2 text-sm font-medium text-textColor "
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className="bg-card border border-gray-300 text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    placeholder="Doe"
                    required
                  />
                </div>

                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-textColor "
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="bg-card border border-gray-300 text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    placeholder="John@Doe.com"
                    required
                  />
                </div>

                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-textColor "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className="bg-card border border-gray-300 text-textColor text-sm rounded-lg focus:outline-none block w-full p-2.5 "
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-themeColor focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 content bg-themeColor">
            <section className="bg-transparent">
              <div className=" px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-28">
                <div className="mr-auto place-self-center lg:col-span-7">
                  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
                    Lorem ipsum dolor sit amet consectetur ?
                  </h1>
                  <p className="max-w-2xl mb-6 font-light text-gray-300 lg:mb-8 md:text-lg lg:text-xl ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Iste sint obcaecati magnam adipisci ullam dolor minus, quasi
                    autem voluptates odit consequuntur labore. Alias, unde illo
                    dolorem quam quia odio veritatis!
                  </p>

                  <button className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 ">
                    Get started
                    <svg
                      className="w-5 h-5 ml-2 -mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
