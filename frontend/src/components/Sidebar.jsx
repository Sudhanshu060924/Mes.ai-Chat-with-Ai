import React from 'react'
import { useSelector } from 'react-redux';
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { RiLogoutCircleLine } from "react-icons/ri";


function Sidebar() {
const {userData,otherUsers} = useSelector((state) => state.user);
const [search,setsearch] = React.useState("false");
  return (
    <div className="w-full md:w-[25%] h-full border-r-2 border-gray-500 bg-gray-300">
      <div className="h-[15%] absolute fixed bottom-0 left-0  ml-4 bg-gray-300 flex justify-center items-center text-3xl text-red-600 cursor-pointer ">
        <RiLogoutCircleLine />
      </div>
      <div className="bg-gray-400/50 w-full h-[25%] rounded-b-[30%] pl-4 flex  justify-between items-center ">
        <div>
          <h1 className=" text-2xl text-black font-semibold ">Mes.ai</h1>
          <h1 className="text-2xl ">👋, {userData.name}</h1>
        </div>
        <div className="w-20 h-20 border-gray-200 mr-5 flex items-center justify-center border-2 rounded-full  overflow-hidden  ">
          <img
            src={userData.image || "profile.png"}
            alt="profile"
            className=" rounded-full   mx-auto "
          />
        </div>
      </div>
      <div className="flex ">
        {!search && (
          <div
            onClick={() => setsearch(true)}
            className="p-4  flex items-center gap-4  border-gray-500"
          >
            <IoSearch className="cursor-pointer" />
          </div>
        )}

        {search && (
          <form className=" px-10 mt-4 mx-4 flex items-center gap-4 border-2 rounded-full  border-gray-500">
            <IoSearch className="" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 text-lg rounded-md outline-none"
            />
            <RxCross2
              className="cursor-pointer text-gray-800 text-2xl"
              onClick={() => setsearch(false)}
            />
          </form>
        )}
        {otherUsers?.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-2 mt-4  border-gray-500"
          >
            <div className="w-12 h-12 border-gray-200  flex items-center justify-center border-2 rounded-full  overflow-hidden  ">
              <img
                src={user.image || "profile.png"}
                alt="profile"
                className=" rounded-full   mx-auto "
              />
            </div>
            <h1 className="text-lg">{user.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar
