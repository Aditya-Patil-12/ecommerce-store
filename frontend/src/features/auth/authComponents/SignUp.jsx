import { Link } from "react-router";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { createUserAsync } from "../AuthSlice";
import verifyRegisterDetails from "../../../utils/checkRegisterDetails";
import PasswordGuideLines from "./PasswordGuideLines";
import { useNavigate } from "react-router";
import { ToastContainer,toast } from "react-toastify";
export default function SignUp() {
  const dispatch = useDispatch();
  const navigate  = useNavigate();
  const [isGuidelinesOpen, setIsGuidlinesOpen] = useState(false);


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const btn = e.target.querySelector("#registerBtn");
      btn.disabled = true;
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      const validateEntries = verifyRegisterDetails(data);

      let toastMessage = validateEntries.success ? "" : validateEntries.msg,
        isWarning = true;

      if (validateEntries.success) {
        const { userName: name, email, password } = data;
        const { payload: registered } = await dispatch(
          createUserAsync({ name, email, password })
        );
        // console.log("just check ", registered);

        if (registered.success) {
          toastMessage = "Registration Successfull";
        } else {
          toastMessage = registered.msg;
          isWarning = false;
        }
      }
      if (toastMessage == "Registration Successfull") {
        // console.log("Starting to make ");

        toast.success(toastMessage, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: false,
          pauseOnHover: false,
          onClose: () => navigate("/login", { replace: true }),
        });
      } else if (!isWarning) {
        btn.disabled = false;
        console.log(toastMessage);
        toast.error(toastMessage);
        e.target.reset();
      } else {
        btn.disabled = false;
        toast.warning(toastMessage);
      }
    } catch (error) { console.log("over here ", error);
      }
  };
  return (
    <>
    <ToastContainer/>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/Logo.png"
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


            <div id="formBtn">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                id="registerBtn"
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