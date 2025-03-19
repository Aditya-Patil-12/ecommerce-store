import { Link } from "react-router";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { createUserAsync } from "../AuthSlice";
import verifyRegisterDetails from "../../../utils/checkRegisterDetails";
import PasswordGuideLines from "./PasswordGuideLines";
import { Navigate } from "react-router";
import { ToastContainer,toast } from "react-toastify";
export default function SignUp() {
  const [isGuidelinesOpen, setIsGuidlinesOpen] = useState(false);
  const [isRegistered,setIsRegistered] =useState(false);
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    
    const verify = verifyRegisterDetails(data);
    console.log(verify);
    if (verify.success) {
      // e.currentTarget.reset();
      const registerUser = async () => {
        await dispatch(
          createUserAsync({ ...data, addresses: [], role: "customer" })
        );
        setIsRegistered(true);
      };
      registerUser();
    }
    else{
      toast.info(verify.msg);
    }
  };
  return (
    <>
    <ToastContainer/>
      {isRegistered && <Navigate to="/login" replace={true} />}

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm/6 font-medium text-gray-900"
              >
                User Name
              </label>

              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <button
                    type="button"
                    onClick={() => setIsGuidlinesOpen(!isGuidelinesOpen)}
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Password Guidelines
                  </button>
                </div>
              </div>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <div className="mt-2">
                {isGuidelinesOpen && <PasswordGuideLines />}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a Member?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login to Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}