<div className="h-200 flex flex-col shadow-xl border-red-950 bg-white">
  {/* Outermost Border .... Below  */}
  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 ">
    <div className="info-center flex flex-row justify-between mb-3">
      {/* Profile Picture &  Name =========================== */}
      <div className="profile-center grid place-items-center">
        <div className="size-50 shrink-0 rounded-full overflow-hidden border-gray-200">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile-Pic"
            className="size-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-medium text-gray-900">
          {userName ? null : "Guest"}
        </h1>
      </div>
      {/* ====================================== */}

      <div className="primary-info flex flex-col gap-2 justify-center">
        <div className="flex justify-baseline gap-2">
          <p className="text-xl font-light text-gray-900">Name</p>
          <h1 className="text-xl font-medium text-gray-900">
            : {userName ? userName : "Guest"}
          </h1>
        </div>
        <div className="flex justify-baseline gap-2">
          <p className="text-xl font-light text-gray-900">Email</p>
          <h1 className="text-xl font-medium text-gray-900">
            : {userEmail ? userEmail : "guest@gmail.com"}
          </h1>
        </div>
        {/* <h1 className="text-2xl font-medium text-gray-900">
        Phone :{" "}
        {userInfo?.phoneNo ? userInfo.phoneNo : "+91 0000000000"}
      </h1> */}
      </div>
    </div>

    <div className="mt-8 py-4">
      <div className="address-heading flex flex-row justify-between">
        <h1>Addresses</h1>
        <button
          type="button"
          className="bg-indigo-600 cursor-pointer rounded-md p-2"
          onClick={() => setIsAddressModalOpen("add")}
        >
          Add Address
        </button>
      </div>

      {/* TODO : study flow root */}

      <div className="flow-root mt-5 px-2 py-2">
        <ul role="list" className="-my-6 divide-y divide-black-1000">
          {userAddresses.length === 0 && (
            <li>
              <h1>Please Provide At Least One Address</h1>
            </li>
          )}
          {userAddresses &&
            userAddresses.map((address, index) => (
              <div className="flex flex-col py-6" key={address.fullName}>
                <div className="flex flex-col">
                  <div className="address-info flex flex-row justify-between">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm/6 font-bold text-gray-900">
                          {address.fullName}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          {address.phoneNo}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="font-bold text-gray-900">{address.city}</p>
                      <p className="mt-1 text-xs/5 text-gray-500">
                        {address["postal-code"]}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between px-2">
                    <button
                      type="button"
                      onClick={(e) => setIsAddressModalOpen(index + 1)}
                      className="px-3 py-2 text-sm font-semibold text-indigo-600  hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleRemove(e, index)}
                      className="px-3 py-2 text-sm font-semibold text-indigo-600  hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </div>
  </div>
</div>;








//=======================================
<div className="flex flex-col py-6 container" key={address.fullName}>
  <div className="flex flex-col">
    <div className="address-info flex flex-row justify-between">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-bold text-gray-900">
            {address.fullName}
          </p>
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            {address.phoneNo}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="font-bold text-gray-900">{address.city}</p>
        <p className="mt-1 text-xs/5 text-gray-500">{address["postal-code"]}</p>
      </div>
    </div>
    <div className="flex flex-row justify-between px-2">
      <button
        type="button"
        onClick={(e) => setIsAddressModalOpen(index + 1)}
        className="px-3 py-2 text-sm font-semibold text-indigo-600  hover:text-indigo-500"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={(e) => handleRemove(e, index)}
        className="px-3 py-2 text-sm font-semibold text-indigo-600  hover:text-indigo-500"
      >
        Remove
      </button>
    </div>
  </div>
</div>;