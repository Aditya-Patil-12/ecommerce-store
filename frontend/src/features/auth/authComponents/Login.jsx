import { useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { Link, Navigate } from "react-router";
import { useSelector,useDispatch } from "react-redux";

import verifyRegisterDetails from "../../../utils/checkRegisterDetails";
import { checkUserAsync } from "../AuthSlice";
import { setIsLogin } from "../AuthSlice";
export default function Login() {
  const dispatch = useDispatch();
  const [role, setRole] = useState("customer");
  const userInfo = useSelector((state) => state.user.userInfo);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    const verify = verifyRegisterDetails({...data,login:true});
    if( verify.success ){
      const fetchUser = async () => {
        await dispatch(setIsLogin(true));
        await dispatch(checkUserAsync(data));
        await dispatch(setIsLogin(false));
      };
      fetchUser(); 
    }
  };
  console.log(role);
  
  return (
    <>
      {userInfo && <Navigate to="/products" replace={true} />}
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  // onChange={handleChange}
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
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
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
            </div>

            <div className="outer">
              <div className="flex items-center justify-between outer-role-container ">
                {/* Role Input  */}
                <p
                  htmlFor="role"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Role
                </p>
              </div>
              <div className="mt-2 mb-2 flex flex-row flex-wrap justify-around items-center">
                {/* Customer ===================================== */}
                <div
                  onClick={() => setRole("customer")}
                  className={`flex flex-col flex-wrap justify-center items-center box-border
                    rounded-md h-15 w-40
                    ${role === "customer" ? "border-indigo-600 border-5" : ""}`}
                >
                  <div
                    className={`flex flex-flex-wrap justify-between items-center
                `}
                  >
                    <label htmlFor="customerRole">Customer</label>
                    <IoMdPerson
                      className={
                        (role === "customer" ? "text-gray-600" : "") +
                        " w-12 h-7.5"
                      }
                    />
                  </div>
                  <input
                    id="customerRole"
                    name="role"
                    type="radio"
                    value="customer"
                    checked={role === "customer"}
                    onChange={(e) =>
                      setRole((state) => {
                        if (state !== "customer") return "customer";
                        return state;
                      })
                    }
                    // required
                    className="hidden"
                  />
                </div>
                {/* ============================================ */}
                {/* Admin ========================== */}
                <div
                  onClick={(e) => setRole("admin")}
                  className={`flex flex-col flex-wrap justify-center items-center  box-border
                    h-15 w-40 rounded-md
                    ${role === "admin" ? "border-5 border-indigo-600" : ""}`}
                >
                  <div
                    className={`flex flex-flex-wrap justify-between items-center px-2
                      py-2`}
                  >
                    <label htmlFor="adminRole">Admin</label>
                    <RiAdminFill
                      className={
                        (role === "admin" ? "text-gray-600" : "") +
                        " w-12 h-7.5"
                      }
                    />
                  </div>
                  <input
                    id="adminRole"
                    name="role"
                    type="radio"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) =>
                      setRole((state) => {
                        if (state !== "admin") return "admin";
                        return state;
                      })
                    }
                    className="hidden"
                  />
                </div>
                {/* ======================================= */}
              </div>
            </div>

            <div>
              <button
                onClick={() => console.log("CLicked the submit button")}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create An Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
