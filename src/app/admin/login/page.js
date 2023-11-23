"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/store/reducer/admin/adminLoginReducer";

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(adminLogin(data))
      .then((response) => {
        // Extract the response data from the 'data' property
        const responseData = response.data;
        const { token, isAdmin } = responseData;

        // Store the token and teamLead status in the local storage
        localStorage.setItem("token", token);
        localStorage.setItem("admin", isAdmin);

        // Redirect to the appropriate dashboard based on the teamLead status
        if (isAdmin) {
          router.push("http://localhost:3000/admin/dashboard");
        } else {
          router.push("http://localhost:3000/");
        }
      })
      .catch((error) => {
        console.log("Login failed:", error.message);
      });
  };
  // if admin is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("http://localhost:3000/admin/dashboard");
    }
  }, []);

  return (
    <section className="bg-card ">
      <div className="flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex ">
          <div className=" w-full lg:w-1/2 bg-white shadow  md:mt-0 xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-lg font-bold leading-tight tracking-tight text-textColor md:text-2xl ">
                Welcome Back To Admin Login
              </h1>
              
              
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                    placeholder="Enter Your Email"
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
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-card focus:ring-3 focus:ring-blue-300"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label for="remember" className="text-gray-500 ">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium  hover:underline "
                    style={{Color:"black"}}
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-themeColor focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  style={{backgroundColor:"black"}}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/2 content " style={{ background: "linear-gradient(to right, #41295a, #2f0743)"}}>
            <section className="bg-transparent">
              <div className=" px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-28">
                <div className="mr-auto place-self-center lg:col-span-7">
                  <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
                    Welcome Back To Employee management System
                  </h1>
                  <p className="max-w-2xl mb-6 font-light text-gray-300 lg:mb-8 md:text-lg lg:text-xl ">
                    Scalable | Secure | Responsive User Interface
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
