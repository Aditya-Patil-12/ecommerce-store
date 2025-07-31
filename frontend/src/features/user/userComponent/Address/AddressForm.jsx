import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfoAsync } from '../../UserSlice';
const url =
  "https://nominatim.openstreetmap.org/reverse?format=jsonv2";
const AddressForm = ({ setIsEdit ,address }) => {
    
    const dispatch = useDispatch();
    const  userInfo = useSelector((state) => state.user.userInfo);
    
    const [currentCord,setCurrentCord] = useState({
        lat:"",
        lon:"",
    });
    
    const [info,setInfo] = useState({fullName:address?.fullName,email :address?.email,streetAddress:address?.streetAddress,phoneNo:address?.phoneNo,country:address?.country,postalCode:address?.postalCode,city:address?.city,region:address?.region});
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        let data = new FormData(e.currentTarget);
        data = Object.fromEntries(data);
        console.log(data);
        if( address ){
            // edit 
            console.log(userInfo);
            
            const index = userInfo.addresses.findIndex((userAddress)=>{
                let same = true;
                for(let key in address){
                    if (userAddress[key] !== address[key]) {
                      same = false;
                    } 
                }
                return same;
            });
            console.log(index);
            let newInfo = null;
            if( index != -1){
                let newAddresses = [...userInfo.addresses];
                newAddresses[index] = { ...userInfo.addresses[index] , ...data};
                newInfo = { ...userInfo, addresses: newAddresses };
                // userInfo.addresses[index] = data;
            }
            else console.log("Invalid Index\n");
            
            
            console.log(userInfo, " ", {...newInfo});
            await dispatch(updateUserInfoAsync({
                ...newInfo
            }))
        }
        else{
            
            await dispatch(
                updateUserInfoAsync({
                    ...userInfo,
                    addresses: [...userInfo.addresses, data],
                })
            );
        }
        setIsEdit("none");
    }
    
    console.log(address," ",info);
    useEffect(()=>{
        if( currentCord.lat != "" && currentCord.lon != "" ){
            console.log(currentCord);
            const findLocation = async() =>{
                let temp = url;
                temp+=`&lat=${currentCord.lat}`
                temp+= `&lon=${currentCord.lon}`;

                let data = await fetch(temp);
                data = await data.json();
                console.log(data);
                
                data = {
                  city: data.address.city,
                  country: data.address.country,
                  postalCode: data.address.postcode,
                  region: data.address.state,
                  phoneNo: data.address.phoneNo,
                  streetAddress:
                    data.address.neighbourhood +
                    " , " +
                    data.address.suburb +
                    " , " +
                    data.address.city_district,
                };
                setInfo({
                    ...info,
                    ...data
                });
            }
            findLocation();
        }
    },[currentCord]);

    return (
      <form className="border-2" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12 pt-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              Edit Address
            </h2>
            <button
              type="button"
              className="mt-2 ml-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              onClick={(e) => {
                window.navigator.geolocation.getCurrentPosition((p) => {
                  console.log(p);

                  setCurrentCord({
                    lat: p.coords.latitude,
                    lon: p.coords.longitude,
                  });
                });
              }}
            >
              Use my Current Location
            </button>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* Name */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="fullName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={info.fullName}
                    onChange={(e) =>
                        {
                            setInfo({
                              ...info,
                              fullName: e.target.value,
                            })
                        }
                    }
                    // autoComplete ===>
                    autoComplete="name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {/* Email */}
              <div className="sm:col-span-3">
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
                    autoComplete="email"
                    value={info.email}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        email: e.target.value,
                      })
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {/* Phone */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="phoneNo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phoneNo"
                    name="phoneNo"
                    type="tel"
                    autoComplete="tel"
                    value={info.phoneNo}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        phoneNo: e.target.value,
                      })
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {/* Country */}
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    value={info.country}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        country: e.target.value,
                      })
                    }
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
              {/* Street Address */}
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="streetAddress"
                    type="text"
                    autoComplete="street-address"
                    value={info.streetAddress}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        streetAddress: e.target.value,
                      })
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {/* State  */}
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="region"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <input
                    id="region"
                    name="region"
                    type="text"
                    autoComplete="address-level1"
                    value={info.region}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        region: e.target.value,
                      })
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {/* City */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={info.city}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        city: e.target.value,
                      })
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {/* Postal Code */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    id="postal-code"
                    name="postalCode"
                    type="text"
                    autoComplete="postal-code"
                    value={info.postalCode}
                    onChange={(e) =>
                      setInfo({
                        ...info,
                        postalCode: e.target.value,
                      })
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {/* <button
              type="reset"
              className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
            >
              Reset
            </button> */}
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
              onClick={() => {
                setIsEdit("none");
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    );
};

export default AddressForm
